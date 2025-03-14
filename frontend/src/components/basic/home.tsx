import React from "react";
import HeroSection from "../sections/home_sections/hero_section";
import AboutUsSection from "../sections/home_sections/about_us_section";
import GallerySection from "../sections/home_sections/gallery_section";
import ReviewForm from "../reviews/review_form";
import ReviewSection from "../sections/home_sections/review_section";
import CabinFeatures from "../sections/home_sections/cabin_features_section";
import AccommodationDetails from "../sections/home_sections/accommodation_details";
import Footer from "../footer/footer";
const Home: React.FC = () => {
  return (
    <>
      <section className="home">
        <HeroSection />
        <AboutUsSection />
        <CabinFeatures />
        <AccommodationDetails />
        <ReviewSection />
        <GallerySection />
        <ReviewForm />
      </section>
      <Footer />
    </>
  );
};

export default Home;
