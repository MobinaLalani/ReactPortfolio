import React, { useState, useRef, useEffect } from "react";
import { motion, PanInfo } from "framer-motion";
import { useTheme } from "../../hooks/theme/ThemeContext";

interface BottomSheetProps {
  children: React.ReactNode;
  minHeight?: number;
  midHeight?: number;
  snapPoints?: number[];
  expandHeight?: number; // ارتفاع هنگام focus روی input
  forceExpand?: boolean; // وقتی true باشه ارتفاع به expandHeight میره
}

const BottomSheet: React.FC<BottomSheetProps> = ({
  children,
  minHeight = 470,
  midHeight = 300,
  snapPoints = [300, 500, 700],
  expandHeight,
  forceExpand = false,
}) => {
  const { colors } = useTheme();
  const [maxHeight, setMaxHeight] = useState(window.innerHeight * 0.9);
  const [currentHeight, setCurrentHeight] = useState<number>(minHeight);
  const [isDragging, setIsDragging] = useState(false);

  const dragHandleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateMaxHeight = () => setMaxHeight(window.innerHeight * 0.9);
    window.addEventListener("resize", updateMaxHeight);
    return () => window.removeEventListener("resize", updateMaxHeight);
  }, []);

  // وقتی forceExpand فعال باشه، ارتفاع به expandHeight میره
  useEffect(() => {
    if (forceExpand && expandHeight) {
      setCurrentHeight(expandHeight);
    } else if (!forceExpand && currentHeight > maxHeight) {
      setCurrentHeight(maxHeight);
    }
  }, [forceExpand, expandHeight, maxHeight]);

  const allSnapPoints = Array.from(
    new Set([minHeight, midHeight, maxHeight, ...snapPoints])
  ).sort((a, b) => a - b);

  const findClosestSnapPoint = (height: number) =>
    allSnapPoints.reduce((prev, curr) =>
      Math.abs(curr - height) < Math.abs(prev - height) ? curr : prev
    );

  const handleDragStart = () => {
    if (!forceExpand) setIsDragging(true);
  };

  const handleDrag = (_: any, info: PanInfo) => {
    if (forceExpand) return;
    const windowHeight = window.innerHeight;
    const newHeight = Math.min(
      Math.max(windowHeight - info.point.y, minHeight),
      maxHeight
    );
    setCurrentHeight(newHeight);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (forceExpand) return;
    setIsDragging(false);
    const windowHeight = window.innerHeight;
    let newHeight = windowHeight - info.point.y;
    if (newHeight < minHeight) newHeight = minHeight;
    if (newHeight > maxHeight) newHeight = maxHeight;
    setCurrentHeight(findClosestSnapPoint(newHeight));
  };

  return (
    <motion.div
      className="fixed inset-x-0 bottom-0 flex flex-col justify-end z-40 pointer-events-none "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Container اصلی بدون drag */}
      <motion.div
        drag={false}
        className="w-full shadow rounded-t-[30px] pointer-events-auto"
        style={{
          backgroundColor: colors.background,
          height: `${currentHeight}px`,
          touchAction: "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* فقط handle drag */}
        <motion.div
          ref={dragHandleRef}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className="flex w-full items-center justify-center p-2 cursor-grab"
        >
          <div className="w-24 h-1 my-2 bg-gray-500 rounded-lg"></div>
        </motion.div>

        {/* محتوا */}
        <div
          className="p-4 pt-0 overflow-y-auto"
          style={{ pointerEvents: isDragging ? "none" : "auto" }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BottomSheet;
