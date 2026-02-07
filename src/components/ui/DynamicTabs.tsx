"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";

interface TabProps {
  label: string;
  content: React.ReactNode;
}

interface DynamicTabsProps {
  tabs: TabProps[];
  defaultActiveTab?: number;
  className?: string;
  contentClassName?: string;
  activeTabClassName?: string;
  inactiveTabClassName?: string;
  inputClassName?: string;
  activeIndex?: number;
  onChangeActive?: (index: number) => void;
}

const DynamicTabs: React.FC<DynamicTabsProps> = React.memo(
  ({
    tabs,
    defaultActiveTab = 0,
    className = "",
    contentClassName = "",
    activeTabClassName = "tab-active border-b-[2px] border-[#FF7959] text-[#FF7959]",
    inactiveTabClassName = "",
    inputClassName = "",
    activeIndex,
    onChangeActive,
  }) => {
    const [internalActive, setInternalActive] = useState(defaultActiveTab);
    const pathname = usePathname(); // ✅ Next.js router
    const currentActive =
      typeof activeIndex === "number" ? activeIndex : internalActive;
    const setActive = (index: number) => {
      if (onChangeActive) onChangeActive(index);
      else setInternalActive(index);
    };

    return (
      <div
        className={`w-full relative p-4 rounded-2xl flex flex-col justify-start items-start transition-all duration-300 ${className}
          ${pathname.startsWith("/parcel") ? "opacity-100" : ""}
        `}
      >
        <div
          role="tablist"
          className={`tabs font-bold flex ${inputClassName} overflow-x-auto overflow-y-hidden gap-x-6`}
        >
          {tabs.map((tab, index) => (
            <div
              key={index}
              role="tab"
              aria-selected={currentActive === index}
              onClick={() => setActive(index)}
              className={`tab whitespace-nowrap cursor-pointer transition-all hover:scale-95 active:scale-100
              ${
                currentActive === index
                  ? activeTabClassName
                  : inactiveTabClassName
              }`}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className={`w-full ${contentClassName}`}>
          {tabs[currentActive]?.content}
        </div>
      </div>
    );
  }
);

DynamicTabs.displayName = "DynamicTabs";

export default DynamicTabs;
