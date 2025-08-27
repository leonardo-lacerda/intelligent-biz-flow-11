import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Offer from "@/components/Offer";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import LeadCapture from "@/components/LeadCapture";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <div className="animate-fade-up [animation-delay:0.5s] opacity-0 [animation-fill-mode:forwards]">
          <Features />
        </div>
        <div className="animate-slide-in-left [animation-delay:1s] opacity-0 [animation-fill-mode:forwards]">
          <Offer />
        </div>
        <div className="animate-zoom-in [animation-delay:1.5s] opacity-0 [animation-fill-mode:forwards]">
          <SocialProof />
        </div>
        <div className="animate-slide-in-right [animation-delay:2s] opacity-0 [animation-fill-mode:forwards]">
          <HowItWorks />
        </div>
        <div className="animate-fade-up [animation-delay:2.5s] opacity-0 [animation-fill-mode:forwards]">
          <LeadCapture />
        </div>
        <div className="animate-scale-in [animation-delay:3s] opacity-0 [animation-fill-mode:forwards]">
          <FinalCTA />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;