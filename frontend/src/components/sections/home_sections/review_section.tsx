import React, { useEffect, useState, useRef } from "react";
import { Rating } from "react-simple-star-rating";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import "swiper/swiper-bundle.css";
import axios from "axios";
import { motion } from "framer-motion";

interface ReviewSchema {
  reviewId: string;
  starRating: number;
  name: string;
  surname: string;
  reviewText: string;
  _id: string;
  _v: number;
}
const ReviewSection: React.FC = () => {
  //ENV
  const apiURL = import.meta.env.VITE_API;
  //Animation variables
  const [duration] = useState<number>(1.5);
  const [opacityStart] = useState<number>(0);
  const [opacityEnd] = useState<number>(1);
  const [locationStart] = useState<number>(0);
  const [locationEnd] = useState<number>(0);
  const [modeOnce] = useState<boolean>(true);
  const [modeAmount] = useState<any>("all");
  //Swiper variables
  const [slidesPerView, setSlidesPerView] = useState<number>(3);
  //Ref
  const swiperRef = useRef<any | undefined>(undefined);
  //Variables review
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [reviews, setReviews] = useState<ReviewSchema[]>([]);
  const [swiperKey, setSwiperKey] = useState<number>(0);
  //Get reviews
  const getReviews = async () => {
    console.log(apiURL);
    try {
      const response = await axios.get(`${apiURL}/get-reviews`, {
        withCredentials: true,
      });
      const data = await response.data;
      if (data) {
        setReviews(data);
        setSwiperKey((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error, "error reviews");
    }
  };

  //UseEffects
  useEffect(() => {
    getReviews();
    if (window.innerWidth <= 730) {
      setSlidesPerView(1);
    }
  }, []);

  return (
    <section className="review-section">
      <Swiper
        key={swiperKey}
        ref={swiperRef}
        pagination={{ clickable: true, el: ".custom-pagination" }}
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
          waitForTransition: false,
        }}
        spaceBetween={50}
        slidesPerView={slidesPerView}
        onSwiper={(swiper) => console.log(swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex || 0)}
      >
        {reviews &&
          reviews.map((review, index) => (
            <SwiperSlide style={{ minWidth: "200px", position: "relative" }}>
              <motion.article
                className="review-article"
                key={index}
                initial={{ opacity: opacityStart, y: locationStart }}
                whileInView={{
                  opacity: opacityEnd,
                  y: locationEnd,
                  transition: { duration: duration },
                }}
                viewport={{ once: modeOnce, amount: modeAmount }}
              >
                {index !== activeIndex && (
                  <div className="blur-at-review-article"></div>
                )}
                <Rating
                  readonly
                  allowFraction
                  initialValue={review.starRating}
                />
                <p>
                  {review.name && review.name}{" "}
                  {review.surname && review.surname}
                </p>
                <p>{review.reviewText}</p>
              </motion.article>
            </SwiperSlide>
          ))}
        <div className="custom-pagination"></div>
      </Swiper>
    </section>
  );
};

export default ReviewSection;
