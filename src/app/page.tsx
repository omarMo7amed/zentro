import { AboutSection } from "@/widgets/about-section";
import { HeroSection } from "@/widgets/hero-section";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
      <Footer />
    </>
  );
}