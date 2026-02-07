import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as ArrowDownIcon } from "../../icons/svg/arrow-down.svg";

interface Option {
  label: string;
  id: string;
}

interface DropdownSelectorProps {
  value: string; // همیشه id میاد
  onChange: (value: string) => void;
}

const DropdownSelector: React.FC<DropdownSelectorProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: Option[] = [
    { label: "امروز", id: "1" },
    { label: "دیروز", id: "2" },
    { label: "هفته جاری", id: "3" },
    { label: "ماه جاری", id: "4" },
  ];

  // پیدا کردن label از روی id
  const selectedLabel =
    options.find((opt) => opt.id === value)?.label || "انتخاب کنید";

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block my-2" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-200 text-gray-700 rounded-[28px] flex justify-between items-center gap-4 flex-row-reverse"
      >
        <ArrowDownIcon
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="w-[84px] text-right font-semibold">
          {selectedLabel}
        </span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
          {options.map((option) => (
            <li
              key={option.id}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onChange(option.id); // مقدار id ارسال میشه
                setIsOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropdownSelector;
