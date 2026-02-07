import React from "react";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
import { ReactComponent as ScanIcon } from "../../../../components/icons/svg/scannIcon.svg";
import { useNavigate } from "react-router-dom";
import { useActiveButton } from "../../../../components/context/ActiveButtonContext";

const FilterBox: React.FC = () => {
  const { activeButton, setActiveButton } = useActiveButton();
  const navigate = useNavigate();


  return (
    <>
      <div className="flex flex-row justify-between items-center mb-6 ">
        <span className="font-semibold text-xl">مدیریت تسک</span>
        <div className="flex gap-2">
          <button
            onClick={() => navigate("/DeliverParcelWithPOD")}
            className="flex items-center gap-2 px-6 py-1 text-white bg-[#FF7959]  rounded-[12px]"
          >
            <span>تحویل با کد</span>
          </button>
          <button
            onClick={() => navigate("/scanner", { state: { activeButton } })}
            className="flex items-center gap-2 px-4 py-1 text-white bg-[#FF7959] rounded-[12px]"
          >
            <ScanIcon />
            <span>
              ورود بارکد {activeButton === "delivery" ? "تحویل" : "پذیرش"}
            </span>
          </button>

          {/* دکمه جدید */}
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 py-4 w-full">
        <button
          onClick={() => setActiveButton("acceptance")}
          className={`flex items-center justify-center gap-1 px-4 py-2 rounded-[12px] w-1/2 ${
            activeButton === "acceptance"
              ? "bg-[#FF7959] text-white font-semibold"
              : "bg-white text-black font-semibold"
          }`}
        >
          <AcceptanceIcon
            color={activeButton === "acceptance" ? "#FFFFFF" : "#000000"}
          />
          <span
            className={
              activeButton === "acceptance"
                ? "text-white font-semibold"
                : "text-black font-semibold"
            }
          >
            پذیرش
          </span>
        </button>

        <button
          onClick={() => setActiveButton("delivery")}
          className={`flex items-center justify-center gap-1 px-4 py-2 rounded-[12px] w-1/2 
            ${
              activeButton === "delivery"
                ? "bg-[#FF7959] text-white font-semibold"
                : "bg-white text-black font-semibold"
            }`}
        >
          <DeliveryIcon
            color={activeButton === "delivery" ? "#FFFFFF" : "#000000"}
          />
          <span
            className={
              activeButton === "delivery"
                ? "text-white font-semibold"
                : "text-black font-semibold"
            }
          >
            تحویل
          </span>
        </button>
      </div>
    </>
  );
};

export default FilterBox;
