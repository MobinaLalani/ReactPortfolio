// PhotoSlider.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ImageItem = {
  src: string;
  title?: string;
  description?: string;
};

interface PhotoSliderProps {
  images: ImageItem[];
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [showIndicator, setShowIndicator] = useState(true);
  const listRef = useRef<HTMLDivElement | null>(null);

  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!listRef.current) return;
    const speed = 0.6;
    listRef.current.scrollTop += e.deltaY * speed;
  };

  const handleScroll = () => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    setShowIndicator(scrollTop + clientHeight < scrollHeight - 1);
  };

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.addEventListener("scroll", handleScroll);
    return () => {
      list.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!images || images.length === 0) return <div>No images to display</div>;

  return (
    <div className="max-w-6xl mx-auto min-h-[98%] flex gap-8 p-6">
      {/* ستون متن */}
      <div className="flex-1 flex items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.35 }}
            className="bg-gray-100 rounded-xl shadow-md p-6 h-80 md:h-96 overflow-y-auto"
          >
            <p className="text-gray-800 leading-relaxed">
              {images[activeIndex].description}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="relative flex flex-col gap-4 max-h-[80vh] pr-2">
        {/* لیست عکس‌ها با scroll */}
        <div
          ref={listRef}
          onWheel={handleWheel}
          className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto no-scrollbar"
          style={{ scrollBehavior: "smooth" }}
          onScroll={handleScroll}
        >
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <motion.div
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative cursor-pointer rounded-xl transition-all duration-300 ${
                  isActive
                    ? "shadow-3xl"
                    : "opacity-80 hover:opacity-100 shadow-md"
                }`}
              >
                <img
                  src={img.src}
                  alt={img.title || `Image ${i + 1}`}
                  className="w-64 h-64 md:w-72 md:h-72 object-cover rounded-xl"
                />
                {img.title && (
                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-2 left-2 right-2 bg-black/50 text-white text-sm rounded-md text-center py-1"
                  >
                    {img.title}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* فلش فیکس پایین */}
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              key="scroll-indicator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 text-gray-400 text-2xl pointer-events-none"
            >
              ⬇️
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PhotoSlider;
