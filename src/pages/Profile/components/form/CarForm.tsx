import React from "react";
import {ReactComponent as CarModelIcon} from "../../../../components/icons/svg/vehicleIcon.svg";
import { ReactComponent as CarIcon } from "../../../../components/icons/svg/carIcon.svg";
import {ReactComponent as licensePlateIcon} from "../../../../components/icons/svg/licensePlate.svg";
import { ReactComponent as LocationIcon } from "../../../../components/icons/svg/elements.svg";
import {ReactComponent as CorrectIcon} from "../../../../components/icons/svg/correctIcon.svg";
import Icon from "../../../../components/icons/Icon";

function CarForm() {
  const userInfo = {
    vehicleName: "موتور",
    carModle: "موتور یاماها مشکی",
    lable: "۱۲۳ / ۵۶۷۸۹",
    shasyNumber: "NAAP۰۳EE۴HJ۵۰۵۹۸۰",
    MotorNumber: "۱۶۵A۰۱۳۵۴۵۶",
  };

  return (
    <div>
      <div className="bg-white min-h-[400px] rounded-[16px] p-4 mb-[70px]">
        <span className="font-semibold ">اطلاعات خودرو</span>

        {/* Input Fields */}
        {[
          { label: "وسیله نقلیه", value: userInfo.vehicleName, Icon: CarIcon },
          { label: "مدل خودرو", value: userInfo.carModle, Icon: CarModelIcon },
          { label: "پلاک", value: userInfo.lable, Icon: licensePlateIcon, bg: "bg-[#F3FAF7]", border: "border-[#046C4E]", text: "text-[#046C4E]" },
          { label: "شماره شاسی", value: userInfo.shasyNumber, Icon: CorrectIcon,bg: "bg-[#F3FAF7]", border: "border-[#046C4E]", text: "text-[#046C4E]" },
          { label: "شماره موتور", value: userInfo.MotorNumber,Icon:CorrectIcon, bg: "bg-[#F3FAF7]", border: "border-[#046C4E]", text: "text-[#046C4E]" },
        ].map((field, index) => (
          <div key={index} className="mt-4">
            <span className="font-semibold">{field.label}</span>
            <div
              className={`relative flex items-center border rounded-[12px] py-3 px-4 my-4 gap-[10px] 
              ${field.border || "border-gray-300"} ${field.bg || "bg-white"}`}
            >
              <input
                type="text"
                value={field.value}
                readOnly
                className={`w-full bg-transparent focus:outline-none text-right pr-8 ${field.text || "text-gray-600"}`}
              />
              {field.Icon && <field.Icon className="w-5 h-5 text-gray-500 absolute right-2" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarForm;
