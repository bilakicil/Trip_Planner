import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import Features from "./_components/Features";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
      <Hero />
      <PopularCityList />
      <Features />
      <Footer />
    </div>
  );
}
