import Hero from "../components/Hero";
import { PopularCityList } from "../components/PopularCityList";
import Features from "../components/Features";
import Footer from "../components/Footer";

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
