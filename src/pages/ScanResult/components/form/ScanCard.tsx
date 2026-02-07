import React from "react";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
// import { ScannedDataType } from "./ScanData";

interface ScannedCardsProps {
  data: any;
  activeButton: "acceptance" | "delivery";
}

const ScannedCards: React.FC<ScannedCardsProps> = ({ data, activeButton }) => {
  return (
    <div className="space-y-3">
      {data.map((item:any, index:any) => {
        const isCountMatched =
          item.scannedParcelCount === item.totalParcelCount;
        const textColor = isCountMatched ? "text-green-600" : "text-red-600";
        const tagBgColor = item.isSuccess
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700";
        const borderColor = item.isSuccess
          ? "border-gray-200"
          : "border-red-300 border-2";
        const backgroundColor = item.isSuccess ? "bg-gray-50" : "bg-red-50";

        return (
          <div
            key={index}
            className={`p-3 sm:p-4 border rounded-xl ${borderColor} ${backgroundColor} flex flex-col gap-2 transition-all duration-500 ease-in-out transform ${item.isNew ? 'scale-105 bg-opacity-90' : ''}`}
          >
            <div className="flex flex-row justify-between items-center gap-2">
              <div className="flex flex-row gap-2 items-center">
                {activeButton === "acceptance" ? (
                  <AcceptanceIcon color="#FF7959" />
                ) : (
                  <DeliveryIcon color="#FF7959" />
                )}
                <span className="sm:text-sm font-bold text-lg text-black">
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

            {!item.isSuccess && item.message && (
              <div className="mt-2 p-2 bg-red-100 border border-red-200 rounded-md">
                <p className="text-sm text-red-700 font-medium">
                  پیام خطا: {item.message}
                </p>
              </div>
            )}

            {item.isSuccess && (
              <div className="w-full mt-2 flex flex-row justify-between items-center">
                <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                  <span className="font-medium">{item.bundleBarcode}</span>
                  <span className={textColor}>
                    {item.scannedParcelCount} از {item.totalParcelCount} مرسوله
                    اسکن شده
                  </span>
                </div>

                <span>
                  مرسوله{" "}
                  <span className="font-semibold">{item.parcelBarcode}</span> در
                  باندل{" "}
                  <span className="font-semibold">{item.bundleBarcode}</span>{" "}
                  ثبت شد.
                </span>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ScannedCards;
