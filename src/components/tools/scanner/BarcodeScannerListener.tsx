import { useEffect, useRef, useState } from "react";
import useStore from "../../../store/zustand/store";

interface BarcodeScannerListenerProps {
  onScan: (barcode: string) => void;
  onKeyboardLayoutMismatch?: (layout: "persian" | "arabic") => void;
  disableWarningPopup?: boolean;
}

const BarcodeScannerListener: React.FC<BarcodeScannerListenerProps> = ({
  onScan,
  onKeyboardLayoutMismatch,
  disableWarningPopup,
}) => {
  const buffer = useRef<string>("");
  const timeout = useRef<NodeJS.Timeout | null>(null);
  const [showWarning, setShowWarning] = useState<boolean>(false);

  const handleScanEnabled = useStore((state) => state.handleScan);
  console.log("handleScanEnabledinScan", handleScanEnabled);
  const isPersianOrArabicChar = (char: string): boolean => {
    const code = char.charCodeAt(0);
    const isArabicBlock =
      (code >= 0x0600 && code <= 0x06ff) ||
      (code >= 0x0750 && code <= 0x077f) ||
      (code >= 0x08a0 && code <= 0x08ff) ||
      (code >= 0xfb50 && code <= 0xfdff) ||
      (code >= 0xfe70 && code <= 0xfeff);
    const isArabicIndicDigit = code >= 0x0660 && code <= 0x0669;
    const isPersianDigit = code >= 0x06f0 && code <= 0x06f9;
    return isArabicBlock || isArabicIndicDigit || isPersianDigit;
  };

useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!handleScanEnabled) return;

    // 🚫 جلوگیری از تداخل با تایپ در input/textarea/select
    const activeElement = document.activeElement as HTMLElement | null;
    if (
      activeElement &&
      (activeElement.tagName === "INPUT" ||
        activeElement.tagName === "TEXTAREA" ||
        activeElement.tagName === "SELECT" ||
        activeElement.getAttribute("contenteditable") === "true")
    ) {
      return; // اجازه بده تایپ معمولی انجام بشه
    }

    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    if (e.key.length === 1) {
      buffer.current += e.key;
      if (isPersianOrArabicChar(e.key)) {
        setShowWarning(true);
        onKeyboardLayoutMismatch?.("persian");
      }
    }

    if (e.key === "Enter") {
      if (!showWarning && buffer.current.length > 3) {
        onScan(buffer.current);
      }
      buffer.current = "";
    }

    timeout.current = setTimeout(() => {
      buffer.current = "";
    }, 100);
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onScan, onKeyboardLayoutMismatch, showWarning, handleScanEnabled]);

  return (
    <>
      {!disableWarningPopup && showWarning && (
        <div className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center bg-black/40">
          <div className="m-4 w-[92%] max-w-sm rounded-xl bg-white shadow-lg p-4 sm:p-6 text-center">
            <div className="text-red-600 font-bold mb-2">
              کیبورد فارسی فعال است
            </div>
            <div className="text-gray-700 text-sm sm:text-base">
              امکان اسکن وجود ندارد. لطفاً کیبورد را به انگلیسی تغییر دهید.
            </div>
            <button
              className="mt-4 inline-flex items-center justify-center px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 active:scale-[0.98] transition"
              onClick={() => setShowWarning(false)}
            >
              متوجه شدم
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default BarcodeScannerListener;
