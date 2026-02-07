import React from "react";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";

export type ScannedDataType = {
  parcelBarcode: string;
  bundleBarcode: string;
  scannedParcelCount: number;
  totalParcelCount: number;
  isSuccess: boolean;
  message: string;
};

interface ScanDataProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScannedDataType[];
  activeButton: string; // "acceptance" | "delivery"
}

function ScanData({ isOpen, onClose, data, activeButton }: ScanDataProps) {
  if (!isOpen) return null;

  const renderHeader = () => {
    if (activeButton === "acceptance") {
      return (
        <>
          <div className="flex flex-row gap-2 mb-1 mr-3 items-center">
            <AcceptanceIcon color="#FF7959" />
            <h2 className="text-2xl font-bold">پذیرش</h2>
          </div>
          <p className="mb-[40px] mr-3">
            لطفا با توجه به کد باندل موجود، اقدام به جانمایی مرسوله‌ها در
            باندل‌ها کنید.
          </p>
        </>
      );
    }

    return (
      <>
        <div className="flex flex-row gap-2 mb-1 mr-3 items-center">
          <DeliveryIcon color="#FF7959" />
          <h2 className="text-2xl font-bold">تحویل</h2>
        </div>
        <p className="mb-[40px] mr-3">
          لطفا با توجه به کد باندل موجود، اقدام به جداسازی مرسوله‌ها از باندل
          کنید.
        </p>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-4xl p-6 rounded-[28px] shadow-lg relative">
        {renderHeader()}

        <div className="space-y-3 max-h-[70vh] overflow-y-auto">
          {data.map((item, index) => {
            const isCountMatched =
              item.scannedParcelCount === item.totalParcelCount;
            const textColor = isCountMatched
              ? "text-green-600"
              : "text-red-600";
            const tagBgColor = item.isSuccess
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700";

            return (
              <div
                key={index}
                className="p-3 border rounded-[16px] border-[#E5E7EB] bg-gray-50 flex flex-row justify-between"
              >
                <div>
                  <div className="flex flex-row gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                    >
                      <path
                        d="M16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17C13.1421 17 16.5 13.6421 16.5 9.5Z"
                        fill="#0E9F6E"
                      />
                      <path
                        d="M6 9.875L7.875 11.75L12 7.25"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <p>
                      مرسوله{" "}
                      <span className="font-semibold">
                        {item.parcelBarcode}
                      </span>{" "}
                      در باندل{" "}
                      <span className="font-semibold">
                        {item.bundleBarcode}
                      </span>{" "}
                      ثبت شد.
                    </p>
                  </div>
                  <p className={`${textColor} mr-[25px]`}>
                    اسکن شده در باندل{" "}
                    <span className="font-bold">{item.scannedParcelCount}</span>{" "}
                    از{" "}
                    <span className="font-bold">{item.totalParcelCount}</span>
                  </p>
                </div>
                <div className="mb-2">
                  <span
                    className={`px-2 py-1 rounded-[16px] text-sm font-medium ${tagBgColor}`}
                  >
                    {item.message}
                  </span>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-[#FF7959] px-4 py-2 text-white font-semibold rounded-[16px]"
            >
              بستن
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanData;
