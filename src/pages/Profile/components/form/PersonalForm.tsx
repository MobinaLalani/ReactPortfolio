import React from 'react'
import AvatarImage from "../../../../assets/images/AvatarImage.png";
import { ReactComponent as PeersonIcon } from "../../../../components/icons/svg/personIcon.svg";
import { ReactComponent as PhoneIcon } from "../../../../components/icons/svg/greenPhoneIcon.svg";
import { ReactComponent as LocationIcon } from "../../../../components/icons/svg/elements.svg";
import { ReactComponent as NationalCodeIcon } from "../../../../components/icons/svg/NationalCodeIcon.svg";

function PersonalForm() {
    const userInfo = {
        name: "نازنین مسجدی",
        phone: "09193758860",
        nationalCode: "0020267843",
        address: "تهران، خیابان آزادی",
        image: AvatarImage,
      };
  return (
    <div>
         <div className="bg-white h-[600px] rounded-[16px] p-4 mb-[70px]">
        <span className="font-semibold">اطلاعات شخصی</span>
        <div className="flex justify-between items-center p-4 bg-white rounded-2xl shadow-md border border-gray-200 my-4">
          <div className="flex items-center ml-4">
            <img src={userInfo.image} alt="avatar" className="w-12 h-12 rounded-full ml-[6px]" />
            <div className="ml-3">
              <p className="text-black font-medium">{userInfo.name}</p>
              <p className="text-red-500 text-sm">تصویر IMG-0761g6</p>
            </div>
          </div>
          <button className="px-4 py-2 bg-[#FDF6B2] text-[#8E4B10] font-medium rounded-lg border border-[#FACA15]">
            موتور
          </button>
        </div>

        {/* Input Fields */}
        {[
          { label: "نام و نام‌خانوادگی", value: userInfo.name, Icon: PeersonIcon },
          { label: "شماره موبایل", value: userInfo.phone, Icon: PhoneIcon, bg: "bg-[#F3FAF7]", border: "border-[#046C4E]", text: "text-[#046C4E]" },
          { label: "کد ملی", value: userInfo.nationalCode, Icon: NationalCodeIcon, bg: "bg-[#F3FAF7]", border: "border-[#046C4E]", text: "text-[#046C4E]" },
          { label: "نشانی سکونت", value: userInfo.address, Icon: LocationIcon },
        ].map((field, index) => (
          <div key={index}>
            <span className="font-semibold">{field.label}</span>
            <div className={`relative flex items-center border rounded-[12px] py-3 px-4 my-4 bg-white gap-[10px] ${
              field.border || "border-gray-300"
            } ${field.bg || "bg-white"}`}>
              <input
                type="text"
                value={field.value}
                readOnly
                className={`w-full bg-transparent focus:outline-none text-right pr-8 ${
                  field.text || "text-gray-600"
                }`}
              />
              <field.Icon className="w-5 h-5 text-gray-500 absolute right-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PersonalForm
