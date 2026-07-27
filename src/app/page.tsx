import ChatWidget from "@/components/ChatWidget";
import Header from "@/components/Header";import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import OrderCTA from "@/components/OrderCTA";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Portfolio />
      <Stats />
      <Testimonials />
      <OrderCTA />
      
      <ChatWidget />
   
    </>
  );
}