import React, { useRef, useEffect } from "react";

interface Button {
  id: string;
  value: any;
  label: string;
  category: string;
}

interface FilterButtonsProps {
  buttons: Button[];
  onButtonClick: (button: Button) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({
                                                       buttons,
                                                       onButtonClick,
                                                     }) => {
  const activeButtonsRef = useRef<Record<string, string>>({}); // ذخیره شناسه دکمه‌های فعال بر اساس دسته‌بندی

  useEffect(() => {
    // تنظیم پیش‌فرض برای دسته‌بندی isActive
    const isActiveDefault = buttons.find((btn) => btn.category === "isActive");
    if (isActiveDefault) {
      activeButtonsRef.current["isActive"] = isActiveDefault.id;
    }
  }, [buttons]);

  const handleButtonClick = (button: Button): void => {
    const { category, id } = button;

    // به‌روزرسانی شناسه دکمه فعال برای دسته‌بندی مربوطه
    activeButtonsRef.current[category] = id;

    onButtonClick(button);
  };

  const isActive = (category: string, id: string): boolean =>
      activeButtonsRef.current[category] === id;

  return (
      <div className="flex items-center justify-start flex-wrap w-full gap-[10px] mt-[25px]">
        {buttons.map((button) => (
            <div
                key={button.id}
                className={`min-w-[70px] hover:scale-95 active:scale-100 transition-all shadow h-[34px] px-3 py-1.5 rounded-[28px] justify-center items-center gap-2.5 inline-flex cursor-pointer ${
                    isActive(button.category, button.id)
                        ? "bg-[#ff4b4b] text-white"
                        : "bg-gray-200 text-[#111928]"
                }`}
                onClick={() => handleButtonClick(button)}
            >
              <div className="text-right text-sm font-bold">{button.label}</div>
            </div>
        ))}
      </div>
  );
};

export default FilterButtons;
