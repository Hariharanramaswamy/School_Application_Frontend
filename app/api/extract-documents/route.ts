import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();

        const personalDocs = formData.getAll("personalDocs") as File[];
        const educationalDocs = formData.getAll("educationalDocs") as File[];

        const allFiles = [...personalDocs, ...educationalDocs];

        if (allFiles.length === 0) {
            return NextResponse.json(
                { error: "No files uploaded" },
                { status: 400 }
            );
        }

        // Convert each file to base64 and build content blocks
        const imageContentBlocks: Array<{
            type: "image_url";
            image_url: { url: string; detail: string };
        }> = [];

        for (const file of allFiles) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);
            const base64 = buffer.toString("base64");

            const mimeType = file.type || "application/octet-stream";
            const dataUrl = `data:${mimeType};base64,${base64}`;

            imageContentBlocks.push({
                type: "image_url",
                image_url: { url: dataUrl, detail: "high" },
            });
        }

        const openaiApiKey = process.env.OPENAI_API_KEY;
        if (!openaiApiKey) {
            return NextResponse.json(
                { error: "OpenAI API key not configured" },
                { status: 500 }
            );
        }

        const openaiResponse = await fetch(
            "https://api.openai.com/v1/chat/completions",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${openaiApiKey}`,
                },
                body: JSON.stringify({
                    model: "gpt-4o",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a document extraction assistant. Extract student information from the provided documents and return ONLY a valid JSON object. No explanation, no markdown, no code blocks. Only raw JSON.",
                        },
                        {
                            role: "user",
                            content: [
                                {
                                    type: "text",
                                    text: "Extract all student information from these documents and return ONLY a JSON object with exactly these fields: studentName, dateOfBirth (DD/MM/YYYY format), gender, aadhaarNumber, address, city, pincode, fatherName, motherName, previousSchoolName, previousGradeCompleted, tcNumber, yearOfPassing. If a field is not found in the documents, use empty string. Return ONLY the raw JSON object.",
                                },
                                ...imageContentBlocks,
                            ],
                        },
                    ],
                    max_tokens: 1000,
                }),
            }
        );

        if (!openaiResponse.ok) {
            const errorText = await openaiResponse.text();
            console.error("OpenAI API error:", errorText);
            return NextResponse.json(
                { error: "Failed to extract data from documents" },
                { status: 500 }
            );
        }

        const openaiData = await openaiResponse.json();
        const content = openaiData.choices?.[0]?.message?.content || "{}";

        // Parse the JSON from OpenAI's response
        let extractedData;
        try {
            // Clean potentially markdown-wrapped response
            const cleaned = content
                .replace(/```json\s*/g, "")
                .replace(/```\s*/g, "")
                .trim();
            extractedData = JSON.parse(cleaned);
        } catch {
            console.error("Failed to parse OpenAI response:", content);
            extractedData = {};
        }

        console.log("Extracted document data:", JSON.stringify(extractedData, null, 2));

        return NextResponse.json(extractedData);
    } catch (error) {
        console.error("Document extraction error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
