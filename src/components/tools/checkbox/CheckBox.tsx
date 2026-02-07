import React, { useState } from "react";

interface CustomCheckboxProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  className?: string;
  readOnly?: boolean; // اضافه شد
  disabled?: boolean; // اضافه شد
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  checked,
  onChange,
  className = "",
  readOnly = false, // پیش‌فرض false
  disabled = false, // پیش‌فرض false
}) => {
  const isControlled = typeof checked === "boolean";
  const [internalChecked, setInternalChecked] = useState(false);

  const finalChecked = isControlled ? checked : internalChecked;

  const toggle = () => {
    if (readOnly || disabled) return; // اگر فقط خواندنی یا غیرفعال است، کاری انجام نده
    if (!isControlled) {
      setInternalChecked(!internalChecked);
    }
    onChange?.(!finalChecked);
  };

  return (
    <div
      onClick={toggle}
      className={`flex items-center justify-center cursor-pointer rounded-[10px] border-2 transition-all duration-300 ${
        finalChecked
          ? "bg-green-500 border-green-500"
          : "bg-white border-[#9CA3AF]"
      } ${className} ${readOnly ? "cursor-default" : "cursor-pointer"}`} // تغییر cursor
    >
      {finalChecked && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            d="M20.707 5.293a1 1 0 0 1 0 1.414l-10 10a1 1 0 0 1-1.414 0l-5-5a1 1 0 0 1 1.414-1.414L10 14.586l9.293-9.293a1 1 0 0 1 1.414 0z"
          />
        </svg>
      )}
    </div>
  );
};

export default CustomCheckbox;
