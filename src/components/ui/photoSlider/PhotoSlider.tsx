"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ImageItem = {
  src: string;
  title?: string;
  description?: string;
  link?:any
};

interface PhotoSliderProps {
  images: ImageItem[];
  height?: string;
  initialIndex?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  loop?: boolean;
  showThumbnails?: boolean;
  mobileVariant?: "carousel" | "grid" | "row";
  desktopVariant?: "carousel" | "grid";
  breakpoint?: number;
}

const PhotoSlider: React.FC<PhotoSliderProps> = ({
  images,
  height = "78vh",
  initialIndex = 0,
  autoPlay = false,
  autoPlayInterval = 5000,
  loop = true,
  showThumbnails = true,
  mobileVariant = "row",
  desktopVariant = "carousel",
  breakpoint = 768,
}) => {
  const [activeIndex, setActiveIndex] = useState(() =>
    Math.min(Math.max(initialIndex, 0), Math.max(0, images.length - 1))
  );
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < breakpoint : false
  );
  const [zoom, setZoom] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const dragStartRef = useRef<{ x: number; y: number } | null>(null);
  const focusRef = useRef<HTMLDivElement | null>(null);
  const thumbScrollRef = useRef<HTMLDivElement | null>(null);
  const pointerStartXRef = useRef<number | null>(null);
  const pointerActiveRef = useRef<boolean>(false);
  const swipeHandledRef = useRef<boolean>(false);

  const count = images.length;
  const hasMultiple = count > 1;

  const prev = useCallback(() => {
    setActiveIndex((i) => {
      if (i === 0 && !loop) return i;
      return (i - 1 + count) % count;
    });
  }, [count, loop]);
  const next = useCallback(() => {
    setActiveIndex((i) => {
      if (i === count - 1 && !loop) return i;
      return (i + 1) % count;
    });
  }, [count, loop]);
  const goTo = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(i, 0), count - 1);
      setActiveIndex(clamped);
    },
    [count]
  );

  useEffect(() => {
    setIsImageLoaded(false);
  }, [activeIndex]);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [breakpoint]);

  useEffect(() => {
    focusRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!autoPlay || !hasMultiple || isLightboxOpen) return;
    const timer = setInterval(() => {
      next();
    }, Math.max(2000, autoPlayInterval));
    return () => clearInterval(timer);
  }, [autoPlay, autoPlayInterval, hasMultiple, isLightboxOpen, next]);

  useEffect(() => {
    const el = focusRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(count - 1);
      else if (e.key === "Enter" || e.key === " ") setIsLightboxOpen(true);
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [count, next, prev, goTo]);

  useEffect(() => {
    if (!isLightboxOpen) return;
    setZoom(1);
    setTranslate({ x: 0, y: 0 });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsLightboxOpen(false);
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isLightboxOpen, next, prev]);

  useEffect(() => {
    if (!showThumbnails) return;
    const scroller = thumbScrollRef.current;
    if (!scroller) return;
    const activeThumb = scroller.querySelector<HTMLDivElement>(
      `[data-index="${activeIndex}"]`
    );
    if (activeThumb) {
      const containerRect = scroller.getBoundingClientRect();
      const itemRect = activeThumb.getBoundingClientRect();
      if (itemRect.left < containerRect.left) {
        scroller.scrollBy({
          left: itemRect.left - containerRect.left - 16,
          behavior: "smooth",
        });
      } else if (itemRect.right > containerRect.right) {
        scroller.scrollBy({
          left: itemRect.right - containerRect.right + 16,
          behavior: "smooth",
        });
      }
    }
  }, [activeIndex, showThumbnails]);

  const active = useMemo(() => images[activeIndex], [images, activeIndex]);

  if (!images?.length)
    return <div className="text-sm text-gray-500">No images to display</div>;

  const effectiveVariant = isMobile ? mobileVariant : desktopVariant;

  const mainContent =
    effectiveVariant === "grid" ? (
      <div className="max-w-6xl mx-auto w-full px-4 md:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              className="relative group border-2 border-black bg-white rounded-md overflow-hidden shadow-[3px_3px_0_0_#000] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#000] transition"
              onClick={() => {
                goTo(i);
                setIsLightboxOpen(true);
              }}
              aria-label={`نمایش تصویر ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.title || `image ${i + 1}`}
                className="h-36 w-full object-cover"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    ) : effectiveVariant === "row" ? (
      <div className="max-w-6xl mx-auto w-full px-4">
        <div
          className="flex gap-3 overflow-x-auto no-scrollbar pb-2 snap-x snap-mandatory"
          aria-label="Mobile row gallery"
        >
          {images.map((img, i) => {
            const isActive = i === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => {
                  goTo(i);
                  setIsLightboxOpen(true);
                }}
                className={`snap-start shrink-0 rounded-xl overflow-hidden border-2 ${
                  isActive ? "border-black" : "border-transparent"
                } shadow-[3px_3px_0_0_#000]`}
                aria-label={`نمایش تصویر ${i + 1}`}
              >
                <img
                  src={img.src}
                  alt={img.title || `image ${i + 1}`}
                  className="w-[70vw] max-w-[360px] h-[56vh] object-cover"
                  draggable={false}
                />
              </button>
            );
          })}
        </div>
      </div>
    ) : (
      <div
        className="rounded-2xl border-2 border-black bg-white shadow-[6px_6px_0_0_#000] overflow-hidden"
        style={{ height }}
      >
        <div className="grid grid-rows-[1fr_auto] h-full min-h-0">
          <div className="relative h-full min-h-0 bg-gray-100 select-none overflow-hidden">
            <div
              ref={focusRef}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label="Image viewer"
              className="group outline-none h-full w-full min-h-0 flex items-center justify-center"
              onPointerDown={(e) => {
                pointerActiveRef.current = true;
                pointerStartXRef.current = e.clientX;
                swipeHandledRef.current = false;
              }}
              onPointerMove={(e) => {
                if (!pointerActiveRef.current || swipeHandledRef.current)
                  return;
                const startX = pointerStartXRef.current;
                if (startX == null) return;
                const dx = e.clientX - startX;
                const threshold = 40;
                if (dx > threshold) {
                  prev();
                  swipeHandledRef.current = true;
                } else if (dx < -threshold) {
                  next();
                  swipeHandledRef.current = true;
                }
              }}
              onPointerUp={() => {
                if (!pointerActiveRef.current) return;
                pointerActiveRef.current = false;
                pointerStartXRef.current = null;
                swipeHandledRef.current = false;
              }}
              onPointerCancel={() => {
                pointerActiveRef.current = false;
                pointerStartXRef.current = null;
                swipeHandledRef.current = false;
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIndex}
                  src={active.src}
                  alt={active.title || `image ${activeIndex + 1}`}
                  onLoad={() => setIsImageLoaded(true)}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.3 }}
                  className="max-h-full max-w-full object-contain  "
                  draggable={false}
                />
              </AnimatePresence>

              {!isImageLoaded && (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="w-12 h-12 rounded-full border-4 border-gray-300 border-t-gray-500 animate-spin" />
                </div>
              )}

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-black bg-white shadow-[3px_3px_0_0_#000] hover:translate-x-[-2px] hover:shadow-[2px_2px_0_0_#000] transition grid place-items-center"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border-2 border-black bg-white shadow-[3px_3px_0_0_#000] hover:translate-x-[2px] hover:shadow-[2px_2px_0_0_#000] transition grid place-items-center"
                  >
                    ›
                  </button>
                </>
              )}

              <button
                type="button"
                aria-label="Open fullscreen"
                onClick={() => setIsLightboxOpen(true)}
                className="absolute bottom-3 right-3 px-3 py-1.5 rounded-md border-2 border-black bg-white text-xs shadow-[3px_3px_0_0_#000] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#000] transition"
              >
                Fullscreen
              </button>
            </div>

            <div className="absolute left-3 right-3 top-3 pointer-events-none">
              <div className="flex items-center justify-between text-xs text-gray-700">
                <div className="font-semibold">
                  {active.title || `تصویر ${activeIndex + 1}`}
                </div>
                <div className="px-2 py-0.5 rounded border border-black bg-white">
                  {activeIndex + 1}/{count}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border-t-2 border-black bg-[#f7f7f7] h-[160px] md:h-[180px]">
            <div className="md:col-span-2 h-full">
              <div className="text-sm leading-6 text-gray-800 h-full overflow-y-auto pr-1">
                <div className="flex items-start md:items-center gap-3 flex-wrap">
                  <span className="flex-1">{active.description}</span>
                  {active?.link?.url && (
                    <a
                      href={active.link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-md border-2 border-black bg-white shadow-[3px_3px_0_0_#000] hover:translate-y-[1px] hover:shadow-[2px_2px_0_0_#000] transition text-xs font-semibold whitespace-nowrap"
                    >
                      {active.link.label || "View"}
                      <span aria-hidden>↗</span>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {showThumbnails && (
              <div className="md:col-span-1 h-full">
                <div
                  ref={thumbScrollRef}
                  className="flex gap-3 overflow-x-auto no-scrollbar pr-1 h-full items-start"
                  onWheel={(e) => {
                    if (!thumbScrollRef.current) return;
                    const delta =
                      Math.abs(e.deltaX) > Math.abs(e.deltaY)
                        ? e.deltaX
                        : e.deltaY;
                    thumbScrollRef.current.scrollLeft += delta;
                  }}
                  aria-label="Thumbnails"
                >
                  {images.map((img, i) => {
                    const isActive = i === activeIndex;
                    return (
                      <div
                        key={i}
                        data-index={i}
                        className={`shrink-0 cursor-pointer rounded-md border-2 self-start ${
                          isActive ? "border-black" : "border-transparent"
                        }`}
                        onClick={() => goTo(i)}
                        aria-label={`Go to image ${i + 1}`}
                        role="button"
                      >
                        <img
                          src={img.src}
                          alt={img.title || `thumb ${i + 1}`}
                          className={`h-16 w-16 object-cover rounded-md ${
                            isActive
                              ? "opacity-100"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          draggable={false}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );

  return (
    <div
      className="max-w-6xl mx-auto w-full px-4 md:px-6"
      aria-label="Photo slider"
    >
      {mainContent}

      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            className="fixed inset-0 bg-black/85 z-[60] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative w-full h-full max-h-[92vh] max-w-[92vw] p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="w-full h-full overflow-hidden touch-none"
                onDoubleClick={() => {
                  setZoom((z) => (z === 1 ? 2 : 1));
                  setTranslate({ x: 0, y: 0 });
                }}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = Math.sign(e.deltaY);
                  setZoom((z) => {
                    const nextZ = Math.min(4, Math.max(1, z - delta * 0.2));
                    if (nextZ === 1) setTranslate({ x: 0, y: 0 });
                    return nextZ;
                  });
                }}
                onPointerDown={(e) => {
                  if (zoom <= 1) return;
                  setDragging(true);
                  dragStartRef.current = {
                    x: e.clientX - translate.x,
                    y: e.clientY - translate.y,
                  };
                }}
                onPointerMove={(e) => {
                  if (!dragging || zoom <= 1 || !dragStartRef.current) return;
                  const nx = e.clientX - dragStartRef.current.x;
                  const ny = e.clientY - dragStartRef.current.y;
                  const clamp = (v: number, maxAbs: number) =>
                    Math.min(maxAbs, Math.max(-maxAbs, v));
                  const maxX = 0.45 * window.innerWidth * (zoom - 1);
                  const maxY = 0.45 * window.innerHeight * (zoom - 1);
                  setTranslate({ x: clamp(nx, maxX), y: clamp(ny, maxY) });
                }}
                onPointerUp={() => {
                  setDragging(false);
                  dragStartRef.current = null;
                }}
                onPointerCancel={() => {
                  setDragging(false);
                  dragStartRef.current = null;
                }}
                style={{ touchAction: "none" }}
              >
                <img
                  src={active.src}
                  alt={active.title || "fullscreen"}
                  className="w-full h-full object-contain select-none"
                  draggable={false}
                  style={
                    {
                      transform: `translate(${translate.x}px, ${translate.y}px) scale(${zoom})`,
                      transformOrigin: "center center",
                      willChange: "transform",
                      transition: dragging
                        ? "none"
                        : "transform 120ms ease-out",
                    } as React.CSSProperties
                  }
                />
              </div>

              {isMobile && (
                <motion.div
                  initial={{ y: "100%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.28 }}
                  className="absolute left-2 right-2 bottom-2 bg-white rounded-2xl shadow-[4px_4px_0_0_#000] border-2 border-black"
                >
                  <div className="w-16 h-1.5 bg-gray-300 rounded-full mx-auto my-2" />
                  <div className="px-4 pb-3 max-h-[30vh] overflow-y-auto">
                    <div className="text-sm text-gray-800 leading-6">
                      <div className="flex items-start gap-2 flex-wrap">
                        <span className="flex-1">{active.description}</span>
                        {active?.link?.url && (
                          <a
                            href={active.link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-md border-2 border-black bg-white shadow-[3px_3px_0_0_#000] text-xs font-semibold"
                          >
                            {active.link.label || "View"}
                            <span aria-hidden>↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {hasMultiple && (
                <>
                  <button
                    type="button"
                    aria-label="Previous image"
                    onClick={prev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
                  >
                    ‹
                  </button>
                  <button
                    type="button"
                    aria-label="Next image"
                    onClick={next}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
                  >
                    ›
                  </button>
                </>
              )}

              <button
                type="button"
                aria-label="Close fullscreen"
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/90 text-black grid place-items-center hover:bg-white"
              >
                ✕
              </button>
              {zoom > 1 && (
                <button
                  type="button"
                  aria-label="Reset zoom"
                  onClick={() => {
                    setZoom(1);
                    setTranslate({ x: 0, y: 0 });
                  }}
                  className="absolute top-3 left-3 px-3 py-1 rounded-md bg-white/90 text-black"
                >
                  Reset
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoSlider;
