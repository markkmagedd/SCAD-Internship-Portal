"use client";
import React from "react";
import { motion } from "framer-motion";

/* ───────── dummy reviews ───────── */
const REVIEWS = [
  { name: "John D.", text: "Amazing opportunities — user‑friendly and fast!" },
  { name: "Sara K.", text: "I landed my dream internship in two days." },
  { name: "Ahmed M.", text: "The analytics dashboard is pure gold." },
  { name: "Lisa P.", text: "Love the video‑call feature for report reviews." },
  { name: "Carlos G.", text: "The AI suggestions saved me tons of time." },
  { name: "Wei L.", text: "Smooth process, great support team!" },
  { name: "Fatima S.", text: "CV vault & share links are unbeatable." },
  { name: "Oliver R.", text: "10/10, would recommend to every student." },
];

export default function ReviewsCarousel() {
  const [currentGroupIndex, setCurrentGroupIndex] = React.useState(0);
  const [windowWidth, setWindowWidth] = React.useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener
    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      // Set initial width
      handleResize();
    }

    // Clean up
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  // Determine reviews per group based on screen size
  const getReviewsPerGroup = () => {
    if (windowWidth < 640) return 1; // Mobile: 1 review
    if (windowWidth < 1024) return 2; // Tablet: 2 reviews
    return 3; // Desktop: 3 reviews
  };

  const reviewsPerGroup = getReviewsPerGroup();

  /* Split reviews into groups based on screen size */
  const reviewGroups = [];
  for (let i = 0; i < REVIEWS.length; i += reviewsPerGroup) {
    reviewGroups.push(
      REVIEWS.slice(i, Math.min(i + reviewsPerGroup, REVIEWS.length))
    );
  }

  // Auto-advance to next group
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentGroupIndex((prevIndex) =>
        prevIndex === reviewGroups.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds per group

    return () => clearTimeout(timer);
  }, [currentGroupIndex, reviewGroups.length]);

  // Animation for smooth transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  // Track slide direction for animations
  const [[page, direction], setPage] = React.useState([0, 0]);

  // Update direction when current group changes
  React.useEffect(() => {
    const newDirection = currentGroupIndex > page ? 1 : -1;
    setPage([currentGroupIndex, newDirection]);
  }, [currentGroupIndex, page]);

  return (
    <section className="py-8 md:py-12 lg:py-16 bg-gray-100 text-center overflow-hidden">
      <h2 className="mt-10 md:text-5xl text-4xl lg:text-5xl font-extrabold mb-20 lg:mb-30 px-4">
        What Our Users Say
      </h2>

      {/* Centered, responsive container */}
      <div className="relative mx-auto max-w-[90%] md:max-w-[85%] lg:max-w-6xl overflow-hidden">
        <div className="flex justify-center">
          <motion.div
            key={page}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
            }}
            className="flex justify-center gap-4 sm:gap-6 lg:gap-8 w-full px-2 mb-10 sm:px-4"
          >
            {reviewGroups[currentGroupIndex]?.map((review, i) => (
              <div
                key={i}
                className="flex-1 min-w-0 max-w-full 
                       sm:min-w-[280px] lg:min-w-[320px] xl:min-w-[350px]
                       flex-shrink-0 bg-white border border-gray-200 rounded-lg
                       p-3 sm:p-4 lg:p-6 shadow-sm mb-10"
              >
                <p className="italic mb-2 md:mb-3 lg:mb-4 text-sm sm:text-base lg:text-lg text-gray-800">
                  "{review.text}"
                </p>
                <p className="font-semibold text-[#EC1024] text-sm sm:text-base">
                  {review.name}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Pagination indicators */}
        <div className="flex justify-center mt-4 md:mt-6 lg:mt-8 space-x-2">
          {reviewGroups.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentGroupIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                currentGroupIndex === index ? "bg-[#EC1024]" : "bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* extra social proof */}
      <div className="mt-6 md:mt-8 lg:mt-10 text-base md:text-lg font-semibold px-4">
        <p>Over 10,000 happy users</p>
      </div>
      <div className="flex justify-center mt-3 md:mt-4 lg:mt-6 space-x-4 md:space-x-6 text-sm md:text-base">
        <div className="text-blue-600">Facebook</div>
        <div className="text-red-600">Google</div>
        <div className="text-gray-700">GitHub</div>
      </div>
    </section>
  );
}
