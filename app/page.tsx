import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import BeforeAfter from "./components/BeforeAfter";

export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <BeforeAfter />
      </main>
    </>
  );
}