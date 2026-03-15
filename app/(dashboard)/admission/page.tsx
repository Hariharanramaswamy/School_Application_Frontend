"use client";

import { useState, useRef, useCallback } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { apiClient } from "@/lib/api";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
    Upload,
    FileText,
    CheckCircle2,
    AlertTriangle,
    ChevronRight,
    ChevronLeft,
    GraduationCap,
    User,
    Users,
    MapPin,
    BookOpen,
    Loader2,
    X,
    Eye,
} from "lucide-react";

/* ── Types ─────────────────────────────────────────────────────────── */

interface ExtractedData {
    studentName?: string;
    dateOfBirth?: string;
    gender?: string;
    aadhaarNumber?: string;
    address?: string;
    city?: string;
    pincode?: string;
    fatherName?: string;
    motherName?: string;
    previousSchoolName?: string;
    previousGradeCompleted?: string;
    tcNumber?: string;
    yearOfPassing?: string;
}

interface AdmissionFormData {
    // Student
    fullName: string;
    dateOfBirth: string;
    gender: string;
    aadhaarNumber: string;
    bloodGroup: string;
    motherTongue: string;
    nationality: string;
    // Parents
    fatherFullName: string;
    fatherOccupation: string;
    motherFullName: string;
    motherOccupation: string;
    primaryContact: string;
    secondaryContact: string;
    email: string;
    // Address
    currentAddress: string;
    city: string;
    district: string;
    pincode: string;
    // Academic (Grade 1–12)
    previousSchoolName: string;
    previousSchoolAddress: string;
    previousGradeCompleted: string;
    yearOfPassing: string;
    tcNumber: string;
}

/* ── Constants ─────────────────────────────────────────────────────── */

const GRADES = [
    "Pre-KG",
    "KG",
    "Grade 1",
    "Grade 2",
    "Grade 3",
    "Grade 4",
    "Grade 5",
    "Grade 6",
    "Grade 7",
    "Grade 8",
    "Grade 9",
    "Grade 10",
    "Grade 11",
    "Grade 12",
];

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];
const GENDERS = ["Male", "Female", "Other"];

const STEP_LABELS = [
    "Grade Selection",
    "Documents",
    "Student Details",
    "Review & Submit",
];

const ACCEPTED_TYPES = ".jpg,.jpeg,.png,.pdf";

/** Returns true if the grade requires educational documents (Transfer Certificate). */
function needsTC(grade: string) {
    return grade !== "Pre-KG" && grade !== "KG";
}

/** Validates that the TC grade matches the expected previous grade for the selected grade. */
function validateTCGrade(
    selectedGrade: string,
    extractedPrevGrade: string
): { valid: boolean; message: string } {
    if (!needsTC(selectedGrade)) return { valid: true, message: "" };
    if (!extractedPrevGrade)
        return {
            valid: true,
            message: "",
        };

    const mapping: Record<string, string[]> = {
        "Grade 1": ["kg", "kindergarten", "ukg", "upper kindergarten", "sr. kg", "sr.kg", "senior kg"],
        "Grade 2": ["grade 1", "1st", "class 1", "i"],
        "Grade 3": ["grade 2", "2nd", "class 2", "ii"],
        "Grade 4": ["grade 3", "3rd", "class 3", "iii"],
        "Grade 5": ["grade 4", "4th", "class 4", "iv"],
        "Grade 6": ["grade 5", "5th", "class 5", "v"],
        "Grade 7": ["grade 6", "6th", "class 6", "vi"],
        "Grade 8": ["grade 7", "7th", "class 7", "vii"],
        "Grade 9": ["grade 8", "8th", "class 8", "viii"],
        "Grade 10": ["grade 9", "9th", "class 9", "ix"],
        "Grade 11": ["grade 10", "10th", "class 10", "x"],
        "Grade 12": ["grade 11", "11th", "class 11", "xi"],
    };

    const allowedPrevGrades = mapping[selectedGrade];
    if (!allowedPrevGrades) return { valid: true, message: "" };

    const normalised = extractedPrevGrade.trim().toLowerCase();
    const isValid = allowedPrevGrades.some((g) => normalised.includes(g));

    if (!isValid) {
        return {
            valid: false,
            message: `Your Transfer Certificate is for ${extractedPrevGrade}. You are not eligible to apply for ${selectedGrade}.`,
        };
    }

    return { valid: true, message: "" };
}

/* ── Slide Variants ────────────────────────────────────────────────── */

const slideVariants = {
    enter: (dir: number) => ({
        x: dir > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
        x: dir < 0 ? 300 : -300,
        opacity: 0,
    }),
};

/* ── File Upload Card ──────────────────────────────────────────────── */

function UploadCard({
    label,
    description,
    files,
    inputRef,
    onAdd,
    onRemove,
}: {
    label: string;
    description: string;
    files: File[];
    inputRef: React.RefObject<HTMLInputElement | null>;
    onAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemove: (i: number) => void;
}) {
    return (
        <div className="rounded-2xl border border-navy-700/60 bg-navy-800/50 p-5">
            <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                    <FileText className="h-5 w-5 text-emerald-400" />
                </div>
                <div>
                    <p className="font-semibold text-gray-100">{label}</p>
                    <p className="text-xs text-gray-400">{description}</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className="space-y-2 mb-3">
                    {files.map((f, i) => (
                        <div
                            key={`${f.name}-${i}`}
                            className="flex items-center justify-between gap-2 rounded-xl bg-navy-900/60 px-4 py-2.5"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                                <span className="text-sm text-gray-300 truncate">
                                    {f.name}
                                </span>
                            </div>
                            <button
                                type="button"
                                onClick={() => onRemove(i)}
                                className="text-gray-500 hover:text-red-400 transition-colors shrink-0"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-navy-700 hover:border-emerald-500/50 bg-navy-900/30 py-6 transition-colors cursor-pointer group"
            >
                <Upload className="h-6 w-6 text-gray-500 group-hover:text-emerald-400 transition-colors" />
                <span className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                    Click to upload files
                </span>
                <span className="text-xs text-gray-600">
                    JPG, PNG or PDF
                </span>
            </button>

            <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES}
                multiple
                className="hidden"
                onChange={onAdd}
            />
        </div>
    );
}

/* ── Progress Bar ──────────────────────────────────────────────────── */

function ProgressBar({ step }: { step: number }) {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
                {STEP_LABELS.map((label, i) => {
                    const idx = i + 1;
                    const active = idx <= step;
                    const current = idx === step;
                    return (
                        <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
                            <div
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                                    current
                                        ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 scale-110"
                                        : active
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                        : "bg-navy-800 text-gray-500 border border-navy-700"
                                }`}
                            >
                                {active && idx < step ? (
                                    <CheckCircle2 className="h-5 w-5" />
                                ) : (
                                    idx
                                )}
                            </div>
                            <span
                                className={`text-xs font-medium hidden sm:block ${
                                    current
                                        ? "text-emerald-400"
                                        : active
                                        ? "text-gray-400"
                                        : "text-gray-600"
                                }`}
                            >
                                {label}
                            </span>
                        </div>
                    );
                })}
            </div>
            <div className="h-1.5 rounded-full bg-navy-800 overflow-hidden">
                <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    initial={false}
                    animate={{ width: `${((step - 1) / 3) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                />
            </div>
        </div>
    );
}

/* ── Section Header ───────────────────────────────────────────────── */

function SectionHeader({
    icon: Icon,
    title,
}: {
    icon: React.ElementType;
    title: string;
}) {
    return (
        <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <Icon className="h-5 w-5 text-emerald-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-100">{title}</h3>
        </div>
    );
}

/* ── Custom Select ─────────────────────────────────────────────────── */

function FormSelect({
    label,
    id,
    options,
    error,
    register,
    ...rest
}: {
    label: string;
    id: string;
    options: string[];
    error?: string;
    register?: ReturnType<typeof useForm>["register"] extends (...args: infer _A) => infer R ? R : never;
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-1.5">
                {label}
            </label>
            <select
                id={id}
                className="w-full px-4 py-3 rounded-xl bg-navy-800 border-[1.5px] border-navy-700 text-gray-100 transition-all duration-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer"
                {...register}
                {...rest}
            >
                <option value="">Select…</option>
                {options.map((o) => (
                    <option key={o} value={o}>
                        {o}
                    </option>
                ))}
            </select>
            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
            )}
        </div>
    );
}

/* ── TextArea ──────────────────────────────────────────────────────── */

function FormTextarea({
    label,
    id,
    error,
    register,
    ...rest
}: {
    label: string;
    id: string;
    error?: string;
    register?: ReturnType<typeof useForm>["register"] extends (...args: infer _A) => infer R ? R : never;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-semibold text-gray-200 mb-1.5">
                {label}
            </label>
            <textarea
                id={id}
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-navy-800 border-[1.5px] border-navy-700 text-gray-100 transition-all duration-200 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 resize-none"
                {...register}
                {...rest}
            />
            {error && (
                <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
            )}
        </div>
    );
}

/* ── Review Row ────────────────────────────────────────────────────── */

function ReviewRow({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 py-2 border-b border-navy-700/40 last:border-none">
            <span className="text-sm text-gray-400 sm:w-48 shrink-0">{label}</span>
            <span className="text-sm font-medium text-gray-100">{value}</span>
        </div>
    );
}

/* ════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════════════ */

export default function AdmissionPage() {
    // ── Step & direction
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);

    // ── Step 1
    const [selectedGrade, setSelectedGrade] = useState("");

    // ── Step 2
    const [personalDocs, setPersonalDocs] = useState<File[]>([]);
    const [educationalDocs, setEducationalDocs] = useState<File[]>([]);
    const personalRef = useRef<HTMLInputElement>(null);
    const educationalRef = useRef<HTMLInputElement>(null);
    const [extracting, setExtracting] = useState(false);
    const [extractError, setExtractError] = useState("");
    const [tcError, setTcError] = useState("");

    // ── Step 4
    const [submitting, setSubmitting] = useState(false);
    const [applicationNumber, setApplicationNumber] = useState("");
    const [submitError, setSubmitError] = useState("");

    // ── Form
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<AdmissionFormData>({
        defaultValues: { nationality: "Indian" },
    });

    const showAcademic = needsTC(selectedGrade);

    /* ── Navigation helpers ────────────────────────────────────────── */

    const goNext = useCallback(() => {
        setDirection(1);
        setStep((s) => s + 1);
    }, []);

    const goBack = useCallback(() => {
        setDirection(-1);
        setStep((s) => s - 1);
    }, []);

    /* ── Step 2 → Extract documents ────────────────────────────────── */

    const handleExtract = async () => {
        setExtractError("");
        setTcError("");

        if (personalDocs.length === 0) {
            setExtractError("Please upload at least one personal document.");
            return;
        }
        if (showAcademic && educationalDocs.length === 0) {
            setExtractError("Please upload the Transfer Certificate.");
            return;
        }

        setExtracting(true);

        try {
            const fd = new FormData();
            personalDocs.forEach((f) => fd.append("personalDocs", f));
            educationalDocs.forEach((f) => fd.append("educationalDocs", f));

            const res = await fetch("/api/extract-documents", {
                method: "POST",
                body: fd,
            });

            if (!res.ok) {
                const errBody = await res.json().catch(() => null);
                throw new Error(errBody?.error || "Extraction failed");
            }

            const data: ExtractedData = await res.json();

            // TC grade validation
            if (showAcademic && data.previousGradeCompleted) {
                const tcCheck = validateTCGrade(
                    selectedGrade,
                    data.previousGradeCompleted
                );
                if (!tcCheck.valid) {
                    setTcError(tcCheck.message);
                    setExtracting(false);
                    return;
                }
            }

            // Auto-fill form
            if (data.studentName) setValue("fullName", data.studentName);
            if (data.dateOfBirth) setValue("dateOfBirth", data.dateOfBirth);
            if (data.gender) setValue("gender", data.gender);
            if (data.aadhaarNumber) setValue("aadhaarNumber", data.aadhaarNumber);
            if (data.address) setValue("currentAddress", data.address);
            if (data.city) setValue("city", data.city);
            if (data.pincode) setValue("pincode", data.pincode);
            if (data.fatherName) setValue("fatherFullName", data.fatherName);
            if (data.motherName) setValue("motherFullName", data.motherName);
            if (data.previousSchoolName)
                setValue("previousSchoolName", data.previousSchoolName);
            if (data.previousGradeCompleted)
                setValue("previousGradeCompleted", data.previousGradeCompleted);
            if (data.tcNumber) setValue("tcNumber", data.tcNumber);
            if (data.yearOfPassing) setValue("yearOfPassing", data.yearOfPassing);

            goNext();
        } catch (err) {
            setExtractError(
                err instanceof Error ? err.message : "Something went wrong"
            );
        } finally {
            setExtracting(false);
        }
    };

    /* ── Step 4 → Submit ──────────────────────────────────────────── */

    const onSubmit = async (formData: AdmissionFormData) => {
        setSubmitting(true);
        setSubmitError("");

        try {
            const payload = {
                grade: selectedGrade,
                ...formData,
            };

            const res = await apiClient.post("/auth/admission", payload);
            setApplicationNumber(
                res.data?.applicationNumber || res.data || "Application submitted"
            );
            setDirection(1);
            setStep(5); // success screen
        } catch (err) {
            setSubmitError(
                err instanceof Error ? err.message : "Submission failed"
            );
        } finally {
            setSubmitting(false);
        }
    };

    /* ── Render helpers ────────────────────────────────────────────── */

    const addFiles = (
        setter: React.Dispatch<React.SetStateAction<File[]>>
    ) => (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setter((prev) => [...prev, ...Array.from(e.target.files!)]);
        }
        e.target.value = "";
    };

    const removeFile = (
        setter: React.Dispatch<React.SetStateAction<File[]>>,
        idx: number
    ) => {
        setter((prev) => prev.filter((_, i) => i !== idx));
    };

    /* ════════════════════════════════════════════════════════════════
       RENDER
       ════════════════════════════════════════════════════════════════ */

    return (
        <div className="min-h-screen bg-navy-950 py-8 px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl">
                {/* ── Title ──────────────────────────────────────── */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent">
                        Admission Registration
                    </h1>
                    <p className="text-gray-400 mt-2 text-sm">
                        Academic Year 2026–2027
                    </p>
                </div>

                {/* ── Progress ───────────────────────────────────── */}
                {step <= 4 && <ProgressBar step={step} />}

                {/* ── Steps ──────────────────────────────────────── */}
                <AnimatePresence mode="wait" custom={direction}>
                    {/* ═══════ STEP 1: Grade Selection ═══════════════════ */}
                    {step === 1 && (
                        <motion.div
                            key="step-1"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="rounded-2xl border border-navy-700/60 bg-navy-900/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
                        >
                            <SectionHeader icon={GraduationCap} title="Select Grade" />
                            <p className="text-sm text-gray-400 mb-6">
                                Choose the grade your child is applying for.
                            </p>

                            <select
                                id="grade-select"
                                value={selectedGrade}
                                onChange={(e) => setSelectedGrade(e.target.value)}
                                className="w-full px-4 py-3.5 rounded-xl bg-navy-800 border-[1.5px] border-navy-700 text-gray-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 appearance-none cursor-pointer text-base"
                            >
                                <option value="">Select grade…</option>
                                {GRADES.map((g) => (
                                    <option key={g} value={g}>
                                        {g}
                                    </option>
                                ))}
                            </select>

                            <div className="flex justify-end mt-8">
                                <Button
                                    disabled={!selectedGrade}
                                    onClick={goNext}
                                    className="!bg-gradient-to-r !from-emerald-500 !to-emerald-600 !shadow-emerald-500/30 hover:!shadow-emerald-500/40"
                                >
                                    Next <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ═══════ STEP 2: Document Upload ══════════════════ */}
                    {step === 2 && (
                        <motion.div
                            key="step-2"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="rounded-2xl border border-navy-700/60 bg-navy-900/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
                        >
                            <SectionHeader icon={Upload} title="Upload Documents" />

                            <div className="space-y-6">
                                {/* Personal docs */}
                                <UploadCard
                                    label="Personal Documents"
                                    description="Aadhaar Card &amp; Birth Certificate"
                                    files={personalDocs}
                                    inputRef={personalRef}
                                    onAdd={addFiles(setPersonalDocs)}
                                    onRemove={(i) =>
                                        removeFile(setPersonalDocs, i)
                                    }
                                />

                                {/* Educational docs (Grade 1+) */}
                                {showAcademic && (
                                    <UploadCard
                                        label="Educational Documents"
                                        description="Transfer Certificate (TC)"
                                        files={educationalDocs}
                                        inputRef={educationalRef}
                                        onAdd={addFiles(setEducationalDocs)}
                                        onRemove={(i) =>
                                            removeFile(setEducationalDocs, i)
                                        }
                                    />
                                )}
                            </div>

                            {/* Errors */}
                            {extractError && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />
                                    {extractError}
                                </div>
                            )}
                            {tcError && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />
                                    {tcError}
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="ghost"
                                    onClick={goBack}
                                    className="!text-gray-400 hover:!text-gray-200"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Back
                                </Button>
                                <Button
                                    loading={extracting}
                                    onClick={handleExtract}
                                    className="!bg-gradient-to-r !from-emerald-500 !to-emerald-600 !shadow-emerald-500/30 hover:!shadow-emerald-500/40"
                                >
                                    {extracting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            Processing…
                                        </>
                                    ) : (
                                        <>Extract &amp; Continue</>
                                    )}
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ═══════ STEP 3: Auto-Filled Form ═════════════════ */}
                    {step === 3 && (
                        <motion.div
                            key="step-3"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="rounded-2xl border border-navy-700/60 bg-navy-900/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
                        >
                            <form
                                onSubmit={handleSubmit(() => {
                                    goNext();
                                })}
                            >
                                {/* ─ Student Details ──────────────── */}
                                <SectionHeader icon={User} title="Student Details" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                    <Input
                                        label="Full Name"
                                        id="fullName"
                                        register={register("fullName", {
                                            required: "Required",
                                        })}
                                        error={errors.fullName?.message}
                                    />
                                    <Input
                                        label="Date of Birth"
                                        id="dateOfBirth"
                                        placeholder="DD/MM/YYYY"
                                        register={register("dateOfBirth", {
                                            required: "Required",
                                        })}
                                        error={errors.dateOfBirth?.message}
                                    />
                                    <FormSelect
                                        label="Gender"
                                        id="gender"
                                        options={GENDERS}
                                        register={register("gender", {
                                            required: "Required",
                                        })}
                                        error={errors.gender?.message}
                                    />
                                    <Input
                                        label="Aadhaar Number"
                                        id="aadhaarNumber"
                                        register={register("aadhaarNumber")}
                                        error={errors.aadhaarNumber?.message}
                                    />
                                    <FormSelect
                                        label="Blood Group"
                                        id="bloodGroup"
                                        options={BLOOD_GROUPS}
                                        register={register("bloodGroup")}
                                        error={errors.bloodGroup?.message}
                                    />
                                    <Input
                                        label="Mother Tongue"
                                        id="motherTongue"
                                        register={register("motherTongue")}
                                    />
                                    <Input
                                        label="Nationality"
                                        id="nationality"
                                        register={register("nationality")}
                                    />
                                </div>

                                <hr className="border-navy-700/50 my-8" />

                                {/* ─ Parent Details ──────────────── */}
                                <SectionHeader icon={Users} title="Parent Details" />
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                    <Input
                                        label="Father's Full Name"
                                        id="fatherFullName"
                                        register={register("fatherFullName", {
                                            required: "Required",
                                        })}
                                        error={errors.fatherFullName?.message}
                                    />
                                    <Input
                                        label="Father's Occupation"
                                        id="fatherOccupation"
                                        register={register("fatherOccupation")}
                                    />
                                    <Input
                                        label="Mother's Full Name"
                                        id="motherFullName"
                                        register={register("motherFullName", {
                                            required: "Required",
                                        })}
                                        error={errors.motherFullName?.message}
                                    />
                                    <Input
                                        label="Mother's Occupation"
                                        id="motherOccupation"
                                        register={register("motherOccupation")}
                                    />
                                    <Input
                                        label="Primary Contact Number"
                                        id="primaryContact"
                                        type="tel"
                                        register={register("primaryContact", {
                                            required: "Required",
                                        })}
                                        error={errors.primaryContact?.message}
                                    />
                                    <Input
                                        label="Secondary Contact Number"
                                        id="secondaryContact"
                                        type="tel"
                                        register={register("secondaryContact")}
                                    />
                                    <Input
                                        label="Email Address"
                                        id="email"
                                        type="email"
                                        register={register("email", {
                                            required: "Required",
                                        })}
                                        error={errors.email?.message}
                                    />
                                </div>

                                <hr className="border-navy-700/50 my-8" />

                                {/* ─ Address Details ─────────────── */}
                                <SectionHeader icon={MapPin} title="Address Details" />
                                <FormTextarea
                                    label="Current Address"
                                    id="currentAddress"
                                    register={register("currentAddress", {
                                        required: "Required",
                                    })}
                                    error={errors.currentAddress?.message}
                                />
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-4">
                                    <Input
                                        label="City"
                                        id="city"
                                        register={register("city", {
                                            required: "Required",
                                        })}
                                        error={errors.city?.message}
                                    />
                                    <Input
                                        label="District"
                                        id="district"
                                        register={register("district")}
                                    />
                                    <Input
                                        label="Pincode"
                                        id="pincode"
                                        register={register("pincode", {
                                            required: "Required",
                                        })}
                                        error={errors.pincode?.message}
                                    />
                                </div>

                                {/* ─ Academic Details ────────────── */}
                                {showAcademic && (
                                    <>
                                        <hr className="border-navy-700/50 my-8" />
                                        <SectionHeader
                                            icon={BookOpen}
                                            title="Academic Details"
                                        />
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                            <Input
                                                label="Previous School Name"
                                                id="previousSchoolName"
                                                register={register(
                                                    "previousSchoolName"
                                                )}
                                            />
                                            <Input
                                                label="Previous School Address"
                                                id="previousSchoolAddress"
                                                register={register(
                                                    "previousSchoolAddress"
                                                )}
                                            />
                                            <Input
                                                label="Previous Grade Completed"
                                                id="previousGradeCompleted"
                                                register={register(
                                                    "previousGradeCompleted"
                                                )}
                                            />
                                            <Input
                                                label="Year of Passing"
                                                id="yearOfPassing"
                                                register={register(
                                                    "yearOfPassing"
                                                )}
                                            />
                                            <Input
                                                label="TC Number"
                                                id="tcNumber"
                                                register={register("tcNumber")}
                                            />
                                        </div>
                                    </>
                                )}

                                <div className="flex justify-between mt-8">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={goBack}
                                        className="!text-gray-400 hover:!text-gray-200"
                                    >
                                        <ChevronLeft className="h-4 w-4" /> Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="!bg-gradient-to-r !from-emerald-500 !to-emerald-600 !shadow-emerald-500/30 hover:!shadow-emerald-500/40"
                                    >
                                        Review <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* ═══════ STEP 4: Review & Submit ══════════════════ */}
                    {step === 4 && (
                        <motion.div
                            key="step-4"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="rounded-2xl border border-navy-700/60 bg-navy-900/80 backdrop-blur-sm p-6 sm:p-8 shadow-2xl"
                        >
                            <SectionHeader icon={Eye} title="Review Application" />
                            <p className="text-sm text-gray-400 mb-6">
                                Please review all details below before
                                submitting.
                            </p>

                            {/* Grade */}
                            <div className="rounded-xl bg-navy-800/60 p-4 mb-4">
                                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                    Grade Applied
                                </h4>
                                <span className="text-gray-100 font-semibold">
                                    {selectedGrade}
                                </span>
                            </div>

                            {/* Student */}
                            <div className="rounded-xl bg-navy-800/60 p-4 mb-4">
                                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                    Student Details
                                </h4>
                                <ReviewRow label="Full Name" value={getValues("fullName")} />
                                <ReviewRow label="Date of Birth" value={getValues("dateOfBirth")} />
                                <ReviewRow label="Gender" value={getValues("gender")} />
                                <ReviewRow label="Aadhaar Number" value={getValues("aadhaarNumber")} />
                                <ReviewRow label="Blood Group" value={getValues("bloodGroup")} />
                                <ReviewRow label="Mother Tongue" value={getValues("motherTongue")} />
                                <ReviewRow label="Nationality" value={getValues("nationality")} />
                            </div>

                            {/* Parents */}
                            <div className="rounded-xl bg-navy-800/60 p-4 mb-4">
                                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                    Parent Details
                                </h4>
                                <ReviewRow label="Father's Name" value={getValues("fatherFullName")} />
                                <ReviewRow label="Father's Occupation" value={getValues("fatherOccupation")} />
                                <ReviewRow label="Mother's Name" value={getValues("motherFullName")} />
                                <ReviewRow label="Mother's Occupation" value={getValues("motherOccupation")} />
                                <ReviewRow label="Primary Contact" value={getValues("primaryContact")} />
                                <ReviewRow label="Secondary Contact" value={getValues("secondaryContact")} />
                                <ReviewRow label="Email" value={getValues("email")} />
                            </div>

                            {/* Address */}
                            <div className="rounded-xl bg-navy-800/60 p-4 mb-4">
                                <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                    Address
                                </h4>
                                <ReviewRow label="Address" value={getValues("currentAddress")} />
                                <ReviewRow label="City" value={getValues("city")} />
                                <ReviewRow label="District" value={getValues("district")} />
                                <ReviewRow label="Pincode" value={getValues("pincode")} />
                            </div>

                            {/* Academic */}
                            {showAcademic && (
                                <div className="rounded-xl bg-navy-800/60 p-4 mb-4">
                                    <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-3">
                                        Academic Details
                                    </h4>
                                    <ReviewRow label="Previous School" value={getValues("previousSchoolName")} />
                                    <ReviewRow label="School Address" value={getValues("previousSchoolAddress")} />
                                    <ReviewRow label="Previous Grade" value={getValues("previousGradeCompleted")} />
                                    <ReviewRow label="Year of Passing" value={getValues("yearOfPassing")} />
                                    <ReviewRow label="TC Number" value={getValues("tcNumber")} />
                                </div>
                            )}

                            {submitError && (
                                <div className="mt-4 flex items-center gap-2 text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                                    <AlertTriangle className="h-4 w-4 shrink-0" />
                                    {submitError}
                                </div>
                            )}

                            <div className="flex justify-between mt-8">
                                <Button
                                    variant="ghost"
                                    onClick={goBack}
                                    className="!text-gray-400 hover:!text-gray-200"
                                >
                                    <ChevronLeft className="h-4 w-4" /> Back
                                </Button>
                                <Button
                                    loading={submitting}
                                    onClick={handleSubmit(onSubmit)}
                                    className="!bg-gradient-to-r !from-emerald-500 !to-emerald-600 !shadow-emerald-500/30 hover:!shadow-emerald-500/40"
                                >
                                    Submit Application
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* ═══════ STEP 5: Success ══════════════════════════ */}
                    {step === 5 && (
                        <motion.div
                            key="step-5"
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="rounded-2xl border border-navy-700/60 bg-navy-900/80 backdrop-blur-sm p-8 sm:p-12 shadow-2xl text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 200,
                                    damping: 12,
                                    delay: 0.2,
                                }}
                                className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 mb-6"
                            >
                                <CheckCircle2 className="h-10 w-10 text-emerald-400" />
                            </motion.div>
                            <h2 className="text-2xl font-bold text-gray-100 mb-2">
                                Application Submitted!
                            </h2>
                            <p className="text-gray-400 mb-6">
                                Your admission application has been received
                                successfully.
                            </p>
                            {applicationNumber && (
                                <div className="inline-block rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 mb-6">
                                    <span className="text-xs text-emerald-400 uppercase tracking-wider block mb-1">
                                        Application Number
                                    </span>
                                    <span className="text-xl font-bold text-emerald-300">
                                        {applicationNumber}
                                    </span>
                                </div>
                            )}
                            <p className="text-sm text-gray-500">
                                Please save your application number for future
                                reference.
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
