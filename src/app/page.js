import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import ProcessSection from '../components/ProcessSection';
import Portfolio from '../components/Portfolio';
import ReviewsSection from '../components/ReviewsSection';
import CelebritySpotlight from '../components/CelebritySpotlight';
import Footer from '../components/Footer';
import DynamicSeoHead from '../components/DynamicSeoHead';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0A1128] flex flex-col">
      <DynamicSeoHead path="/" />
      <Navbar />
      <Hero />
      <About />
      <CelebritySpotlight />
      <Services />
      <ProcessSection />
      <Portfolio />
      <ReviewsSection />
      <Footer />
    </main>
  );
}
