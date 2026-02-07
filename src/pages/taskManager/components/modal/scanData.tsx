import React, { useEffect, useState } from "react";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import AddAdress from "./AddAdress";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
import Loading from "../../../../components/tools/loading/Loading";

export type ScannedDataType = {
  parcelBarcode: string;
  bundleBarcode: string;
  scannedParcelCount: number;
  totalParcelCount: number;
  sort: any;
  fleetName: string;
  isSuccess: number; // ⬅️ تغییر به نوع عددی
  message: string;
};

interface ScanDataProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScannedDataType[];
  activeButton: string; // "acceptance" | "delivery"
  isLoading?: boolean;
  pendingCount?: number;
}

function ScanData({
  isOpen,
  onClose,
  data,
  activeButton,
  isLoading = false,
  pendingCount = 0,
}: ScanDataProps) {
  const [highlightIndex, setHighlightIndex] = useState<number | null>(null);

  useEffect(() => {
    if (data?.length > 0) {
      setHighlightIndex(0);
      const timeout = setTimeout(() => setHighlightIndex(null), 5000);
      return () => clearTimeout(timeout);
    }
  }, [data]);

  if (!isOpen) return null;

  const renderHeader = () => {
    const isAcceptance = activeButton === "acceptance";

    return (
      <>
        <div className="flex flex-row gap-2 mb-2 items-center">
          {isAcceptance ? (
            <AcceptanceIcon color="#FF7959" />
          ) : (
            <DeliveryIcon color="#FF7959" />
          )}
          <h2 className="text-lg sm:text-2xl font-bold">
            {isAcceptance ? "پذیرش" : "تحویل"}
          </h2>
        </div>
        <p className="mb-4 text-xs sm:text-base leading-relaxed text-gray-600">
          {isAcceptance
            ? "لطفا با توجه به کد باندل موجود، اقدام به جانمایی مرسوله‌ها در باندل‌ها کنید."
            : "لطفا با توجه به کد باندل موجود، اقدام به جداسازی مرسوله‌ها از باندل کنید."}
        </p>
      </>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2 sm:px-0">
      <div className="bg-white w-full sm:w-[90%] max-w-3xl p-3 sm:p-6 rounded-2xl shadow-lg relative flex flex-col max-h-[75vh]">
        {renderHeader()}

        <div className="flex-1 overflow-y-auto pr-1 sm:pr-3 space-y-3">
          {/* 🔄 وضعیت لودینگ */}
          {isLoading && (
            <div className="p-3 border rounded-xl border-blue-200 bg-blue-50 flex flex-col items-center justify-center">
              <Loading size="md" />
              <p className="mt-2 text-blue-700 font-medium text-sm">
                {pendingCount > 0
                  ? `در حال پردازش ${pendingCount} درخواست دیگر...`
                  : "در حال پردازش درخواست..."}
              </p>
            </div>
          )}

          {data
            .slice()
            .reverse()
            .map((item, index) => {

              const isSuccess = item.isSuccess === 0;
              const isError = item.isSuccess === 1;
              const isWarning = item.isSuccess === 15;
              let borderColor = "";
              let backgroundColor = "";
              let tagBgColor = "";
              let iconBg = "";
              let textColor = "";

              if (isSuccess) {
                borderColor = "border-gray-200";
                backgroundColor = "bg-gray-50";
                tagBgColor = "bg-green-100 text-green-700";
                iconBg = "#0E9F6E";
                textColor = "text-green-600";
              } else if (isError) {
                borderColor = "border-red-300 border-2";
                backgroundColor = "bg-red-50";
                tagBgColor = "bg-red-100 text-red-700";
                iconBg = "#DC2626";
                textColor = "text-red-600";
              } else if (isWarning) {
                borderColor = "border-yellow-300 border-2";
                backgroundColor = "bg-yellow-50";
                tagBgColor = "bg-yellow-100 text-yellow-700";
                iconBg = "#FACC15";
                textColor = "text-yellow-600";
              }

              const isCountMatched =
                item.scannedParcelCount === item.totalParcelCount;
              const isHighlighted = highlightIndex === index;
              const highlightStyle = isHighlighted
                ? "border-8 border-orange-300 border-double shadow-lg transition-all duration-500"
                : "";

              return (
                <div
                  key={index}
                  className={`p-2 sm:p-4 border rounded-xl ${borderColor} ${backgroundColor} ${highlightStyle} flex flex-col gap-2`}
                >
                  {/* Header */}
                  <div className="flex flex-row justify-between items-center gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      {/* آیکن وضعیت */}
                      {isSuccess && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <path
                            d="M16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17C13.1421 17 16.5 13.6421 16.5 9.5Z"
                            fill={iconBg}
                          />
                          <path
                            d="M6 9.875L7.875 11.75L12 7.25"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {isError && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <path
                            d="M16.5 9.5C16.5 5.35786 13.1421 2 9 2C4.85786 2 1.5 5.35786 1.5 9.5C1.5 13.6421 4.85786 17 9 17C13.1421 17 16.5 13.6421 16.5 9.5Z"
                            fill={iconBg}
                          />
                          <path
                            d="M6.75 6.75L11.25 11.25M11.25 6.75L6.75 11.25"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                      {isWarning && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="19"
                          viewBox="0 0 18 19"
                          fill="none"
                        >
                          <path
                            d="M9 2L1.5 17H16.5L9 2Z"
                            fill={iconBg}
                            stroke={iconBg}
                            strokeWidth="1"
                          />
                          <path
                            d="M9 7V11"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                          <circle cx="9" cy="13.5" r="0.75" fill="white" />
                        </svg>
                      )}

                      <span className="text-sm sm:text-base font-bold text-black">
                        {item.fleetName} - {item.sort}
                      </span>
                    </div>

                    {item.message && (
                      <span
                        className={`px-2 py-1 rounded-lg text-xs sm:text-sm font-medium ${tagBgColor}`}
                      >
                        {item.message}
                      </span>
                    )}
                  </div>

                  {/* پیام خطا */}
                  {isError && item.message && (
                    <div className="p-2 bg-red-100 border border-red-200 rounded-md">
                      <p className="text-xs sm:text-sm text-red-700 font-medium">
                        پیام خطا: {item.message}
                      </p>
                    </div>
                  )}

                  {/* پیام هشدار */}
                  {isWarning && item.message && (
                    <div className="p-2 bg-yellow-100 border border-yellow-200 rounded-md">
                      <p className="text-xs sm:text-sm text-yellow-700 font-medium">
                        هشدار: {item.message}
                      </p>
                    </div>
                  )}

                  {/* پیام موفق */}
                  {isSuccess && (
                    <div className="w-full flex flex-row justify-between items-center text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-gray-600">
                        <span className="font-medium">
                          {item.bundleBarcode}
                        </span>
                        <span className={textColor}>
                          {item.scannedParcelCount} از {item.totalParcelCount}{" "}
                          مرسوله اسکن شده
                        </span>
                      </div>
                      <span>
                        مرسوله{" "}
                        <span className="font-semibold">
                          {item.parcelBarcode}
                        </span>{" "}
                        در باندل{" "}
                        <span className="font-semibold">
                          {item.bundleBarcode}
                        </span>{" "}
                        ثبت شد.
                      </span>
                    </div>
                  )}
              {/* {(item.sort === 0 || item.sort === null) && (
              <AddAdress/>
)} */}

                </div>
              );
            })}
        </div>

        <div className="pt-3 flex justify-center sm:justify-end shrink-0">
          <button
            onClick={onClose}
            className="bg-[#FF7959] px-4 py-2 sm:px-6 sm:py-2.5 text-white text-sm sm:text-base font-semibold rounded-xl shadow-md hover:opacity-90 transition"
          >
            بستن
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanData;
