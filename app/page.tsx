import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import TimelineSection from "@/components/home/TimelineSection";
import AchievementsSection from "@/components/home/AchievementsSection";
import ContactSection from "@/components/home/ContactSection";

export default function HomePage() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <AboutSection />
                <TimelineSection />
                <AchievementsSection />
                <ContactSection />
            </main>
            <Footer />
        </>
    );
}
