import React, { useState } from "react";

interface StatusTabsProps {
  value: string; // تب انتخاب‌شده از بیرون
  onChange: (value: string) => void; // کال‌بک برای اطلاع دادن به parent
}

const StatusTabs: React.FC<StatusTabsProps> = ({ value, onChange }) => {
  const tabs = [
    { label: "در حال انجام", id: "inProgress" },
    { label: "در انتظار", id: "pending" },
    { label: "انجام شد", id: "done" },
  ];

  return (
    <div className="flex bg-white p-2 rounded-[12px] gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)} // 👈 مقدار انتخاب شده میره بیرون
          className={`px-3 py-2 rounded-[12px] ${
            value === tab.id
              ? "bg-[#FF7959] text-white"
              : "bg-transparent text-gray-600"
          }`}
        >
          <span className="font-semibold">{tab.label}</span>
        </button>
      ))}
    </div>
  );
};

export default StatusTabs;
