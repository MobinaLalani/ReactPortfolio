"use client";

import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";
import { StaticImageData } from "next/image";

import "swiper/css";
import "swiper/css/effect-cards";

interface ImageCardSwiperProps {
  images: any[];
  direction?: "ltr" | "rtl"; // جهت کارت‌ها، پیش‌فرض ltr
}

export default function ImageCardSwiper({
  images,
  direction = "ltr",
}: ImageCardSwiperProps) {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(0); // کارت فعال

  // بستن با ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveImage(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ===== Swiper ===== */}
      <Swiper
        effect="cards"
        modules={[EffectCards]}
        grabCursor
        simulateTouch
        allowTouchMove
        className="mySwiper"
        dir={direction}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        cardsEffect={{
          perSlideOffset: 15,
          perSlideRotate: 2,
          slideShadows: true,
        }}
      >
        {images.map((img, index) => {
          const imageUrl = typeof img === "string" ? img : img.src;

          return (
            <SwiperSlide key={index}>
              <div
                className="slide-inner relative rounded-2xl shadow-xl overflow-hidden transition-transform duration-300 hover:scale-105 bg-gray-100"
                style={{
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                {index === activeIndex && (
                  <button
                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:scale-110 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveImage(img);
                    }}
                    aria-label="Zoom image"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M17.5 17.5L22 22"
                        stroke="#111928"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z"
                        stroke="#111928"
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ===== Fullscreen ===== */}
      {activeImage && (
        <div
          className="fullscreen-overlay fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setActiveImage(null)}
        >
          <img
            src={activeImage}
            alt="fullscreen"
            className="max-h-full max-w-full rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-5 right-5 text-white text-3xl font-bold"
            onClick={() => setActiveImage(null)}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}
