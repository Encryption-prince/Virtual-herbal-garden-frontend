import React, { useEffect, useState } from "react";
import { FaStar, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const visibleCount = 3;

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 for next, -1 for prev
  const [page, setPage] = useState(0); // To re-trigger AnimatePresence

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("https://quarrelsome-mae-subham-org-14444f5f.koyeb.app/feedback/all");
        const data = await res.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Error fetching testimonials", err);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, [testimonials, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + visibleCount) % testimonials.length);
    setPage((prev) => prev + 1);
  };
  
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) =>
      (prev - visibleCount + testimonials.length) % testimonials.length
    );
    setPage((prev) => prev - 1);
  };

  const getVisibleTestimonials = () => {
    const result = [];
    for (let i = 0; i < visibleCount; i++) {
      result.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return result;
  };

  const groupVariants = {
    initial: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    animate: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.5 },
    }),
  };

  return (
    <section className="bg-gradient-to-t from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-green-800 mb-12">What Our Users Say</h2>

        {testimonials.length > 0 ? (
          <div className="relative flex items-center justify-center">
            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-0 z-10 bg-green-100 hover:bg-green-200 p-3 rounded-full shadow-md"
            >
              <FaChevronLeft size={20} className="text-green-700" />
            </button>

            {/* Sliding Section */}
            <div className="overflow-hidden w-full px-8 sm:px-12 relative h-[320px] mt-20">
              <AnimatePresence custom={direction} mode="wait">
                <motion.div
                  key={page}
                  custom={direction}
                  variants={groupVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex gap-6 justify-center absolute left-0 top-0 w-full"
                >
                  {getVisibleTestimonials().map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="w-[300px] shrink-0 rounded-2xl shadow-md p-8 bg-white min-h-65"
                    >
                      <img
                        src={testimonial.profilePictureUrl || "https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                      />
                      <h3 className="text-lg font-semibold text-green-700">{testimonial.name}</h3>
                      
                      <p className="text-gray-600 mt-3">{testimonial.message}</p>
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-0 z-10 bg-green-100 hover:bg-green-200 p-3 rounded-full shadow-md"
            >
              <FaChevronRight size={20} className="text-green-700" />
            </button>
          </div>
        ) : (
          <p className="text-gray-500 mt-10">No testimonials available yet.</p>
        )}
      </div>

      <div className="my-8 border-t border-green-200 m-6" />
    </section>
  );
}
