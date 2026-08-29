
import { FAQSection } from "./components/home/FAQSection";
import { FeaturesSection } from "./components/home/FeaturesSection";
import { HeroSection } from "./components/home/HeroSection";
import { MagicEditorSection } from "./components/home/MagicEditorSection";
import { TestimonialsSection } from "./components/home/TestimonialsSection";

export default function Home() {
    return (
        <main className="min-h-screen mx-auto bg-white dark:bg-gray-950 p-6">
            <HeroSection />
            <FeaturesSection />
            <MagicEditorSection />
            <TestimonialsSection />
            <FAQSection />
        </main>
    )
}