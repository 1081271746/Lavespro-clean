import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import BeforeAfter from "./components/BeforeAfter";
import Gallery from "./components/Gallery";
import About from "./components/About";
export default function Home() {
  return (
    <>
      <Navbar />

      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <BeforeAfter />
        <Gallery />
        <About />
      </main>
    </>
  );
}