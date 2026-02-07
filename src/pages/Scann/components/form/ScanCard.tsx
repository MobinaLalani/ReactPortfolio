import React from "react";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
import ScannedItem from "../../../../Types/scanItem";
import { RequestStatusValue } from "../../../../Types/enums/requestStatus";

/* ---------------------------------- */
/* Types */
/* ---------------------------------- */
interface Props {
  item: ScannedItem;
  mode: "acceptance" | "delivery";
}

type ScanStatus = "success" | "error" | "warning";

/* ---------------------------------- */
/* Status Styles */
/* ---------------------------------- */
const statusStyles = {
  success: {
    border: "border-green-500",
    bg: "bg-green-50",
    badge: "bg-green-100 text-green-800",
    text: "text-green-700",
    title: "موفق",
  },
  error: {
    border: "border-red-500",
    bg: "bg-red-50",
    badge: "bg-red-100 text-red-800",
    text: "text-red-700",
    title: "ناموفق",
  },
  warning: {
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    badge: "bg-yellow-100 text-yellow-800",
    text: "text-yellow-700",
    title: "هشدار",
  },
} satisfies Record<ScanStatus, Record<string, string>>;

/* ---------------------------------- */
/* Helpers */
/* ---------------------------------- */
const getStatusFromRequestStatus = (
  requestStatus: RequestStatusValue
): ScanStatus => {
  if (requestStatus === 0) return "success";
  if (requestStatus === 1) return "error";
  return "warning";
};

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */
const ScanCard: React.FC<Props> = ({ item, mode }) => {
  const status = getStatusFromRequestStatus(item.requestStatus);
  const style = statusStyles[status];

  return (
    <div
      className={`relative rounded-2xl border-r-4 p-4 shadow-sm flex flex-col gap-2
        ${style.border} ${style.bg}`}
    >
      {/* Badge */}
      <span
        className={`absolute top-3 left-3 px-3 py-0.5 rounded-full text-xs font-bold
          ${style.badge}`}
      >
        {style.title}
      </span>

      {/* Header */}
      <div className="flex items-center gap-2 pr-14">
        {/* اگر بعداً خواستی آیکن فعال بشه */}
        {/* {mode === "acceptance" ? (
          <AcceptanceIcon className="w-5 h-5" />
        ) : (
          <DeliveryIcon className="w-5 h-5" />
        )} */}
        <span className="text-sm font-semibold truncate">
          {item.fleetName ?? "—"}
        </span>
      </div>

      {/* Sort */}
      {item.sort !== undefined && (
        <span className="text-xs text-gray-500">ترتیب: {item.sort}</span>
      )}

      {/* Message */}
      {status !== "success" && item.message && (
        <div
          className={`rounded-lg border px-3 py-2 text-xs font-medium bg-white
            ${style.text} ${style.border}`}
        >
          {item.message}
        </div>
      )}

      {/* Barcode */}
      {(item.parcelBarcode || item.bundleBarcode) && (
        <div className="text-xs font-semibold text-gray-700 truncate">
          {item.parcelBarcode
            ? `کد مرسوله: ${item.parcelBarcode}`
            : `کد باندل: ${item.bundleBarcode}`}
        </div>
      )}

      {/* Success – Delivery */}
      {status === "success" && mode === "delivery" && (
        <div className={`mt-2 text-sm font-bold ${style.text}`}>
          {item.scannedParcelCount} / {item.totalParcelCount}
        </div>
      )}

      {/* Success – Acceptance */}
      {status === "success" && mode === "acceptance" && (
        <div className="mt-2 flex flex-col gap-1 text-xs">
          {item.bundleBarcode && (
            <span className="font-semibold truncate">
              کد باندل: {item.bundleBarcode}
            </span>
          )}
          <span className={`font-bold ${style.text}`}>
            {item.scannedParcelCount} از {item.totalParcelCount} مرسوله
          </span>
          {item.parcelBarcode && (
            <span className="font-semibold truncate">
              کد مرسوله: {item.parcelBarcode}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanCard;
