import React, { useState, useRef } from "react";

interface BottomSheetProps {
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ children }) => {
  const [height, setHeight] = useState(600); // ارتفاع پیش‌فرض
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);
  const startHeight = useRef(0);

  const onMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    startHeight.current = height;
    document.body.style.cursor = "ns-resize";

    
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      const delta = startY.current - e.clientY;
      const newHeight = Math.min(
        Math.max(100, startHeight.current + delta),
        window.innerHeight - 50
      );
      setHeight(newHeight);
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
    document.body.style.cursor = "auto";

    // حذف eventها
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      className="absolute bottom-0 left-0 w-full bg-white shadow-lg rounded-t-xl transition-all duration-300"
      style={{ height: `${height}px`, zIndex: 10 }}
    >
      {/* نوار برای کشیدن کامپوننت */}
      <div
        className="w-full h-6 bg-gray-300 cursor-ns-resize rounded-t-xl flex justify-center items-center active:bg-gray-400"
        onMouseDown={onMouseDown}
      >
        <div className="w-12 h-1 bg-gray-500 rounded-full"></div>
      </div>

      {/* محتوای کامپوننت */}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default BottomSheet;
