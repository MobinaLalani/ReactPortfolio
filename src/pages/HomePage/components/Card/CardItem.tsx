import React, { useEffect, useState } from "react";

interface CardItemProps {
  id: string;
  title: string; // اینجا عدد میاد به صورت استرینگ
  description: string;
  icon?: React.ReactNode;
  textColor?: string;
  imageUrl?: string;
  descriptionTextColor?: string;
  badge?: string;
  backgroundColor?: string;
  onClick?: () => void;
}

function CardItem({
  id,
  title,
  textColor,
  description,
  icon,
  imageUrl,
  descriptionTextColor,
  badge,
  backgroundColor,
  onClick,
}: CardItemProps) {
  const targetNumber = Number(title); // چون مطمئنی عدده
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000; // مدت زمان انیمیشن (۲ ثانیه)
    const stepTime = 1000 / 60; // ۶۰ فریم بر ثانیه
    const increment = targetNumber / (duration / stepTime);

    const counter = setInterval(() => {
      start += increment;
      if (start >= targetNumber) {
        clearInterval(counter);
        setCount(targetNumber);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(counter);
  }, [targetNumber]);

  return (
    <div
      id={id}
      className={`${backgroundColor} rounded-xl shadow-lg h-40 overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer flex items-center justify-center`}
      onClick={onClick}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
      ) : (
        <div className="p-5 text-center">
          <div className="flex flex-col items-center gap-2">
            {icon && <div className="text-blue-600">{icon}</div>}
            <h3 className={`text-xl font-bold ${textColor} line-clamp-1`}>
              {count}
            </h3>
            <p className={`line-clamp-2 font-semibold ${descriptionTextColor}`}>
              {description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CardItem;
