import React, { useState, useMemo, useCallback } from "react";
import { useLocation } from "react-router-dom";
import BarcodeScannerZXing from "../../../../components/tools/scanner/Scanner";
import BottomSheet from "../../../../components/layout/bottom-sheet/BottomSheet";
import ScannedItem from "../../../../Types/scanItem";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { ScanAcceptance, ScanDelivery } from "../../../../setting/ApiUrl";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import ScanCard from "./ScanCard";
import { useScanQueue } from "../../../../components/hooks/scan/useScanQueue";

const BOTTOM_SHEET_MIN_HEIGHT = 300;
const MODAL_TIMEOUT = 1500;

function CameraScanForm() {
  const location = useLocation();

  type ScanMode = "acceptance" | "delivery";
  const rawState = location.state as any;

  const mode: ScanMode =
    rawState === "delivery" || rawState?.activeButton === "delivery"
      ? "delivery"
      : "acceptance";

  const [scannedData, setScannedData] = useState<ScannedItem[]>([]);
  const [modalMessage, setModalMessage] = useState<string | null>(null);

  const mutation = useReactMutation({
    url: mode === "delivery" ? ScanDelivery : ScanAcceptance,
    method: HttpMethod.POST,
  });

  const cameraHeight = useMemo(
    () => window.innerHeight - BOTTOM_SHEET_MIN_HEIGHT,
    []
  );

  /* ---------------------------------- */
  /* 🔁 Scan Processor */
  /* ---------------------------------- */
  const scanProcessor = useCallback(
    async (barcode: string) => {
      setModalMessage("در حال اسکن...");

      try {
        const res = await mutation.mutateAsync({
          barcode,
          scanTypeId: 2,
        });

        const result = res?.data?.objectResult;

        const item: ScannedItem = {
          parcelBarcode: result?.parcelBarcode,
          bundleBarcode: result?.bundleBarcode,
          scannedParcelCount: result?.scannedCount,
          totalParcelCount: result?.totalCount,
          sort: result?.sort,
          fleetName: result?.fleetName,
          requestStatus: res?.data?.requestStatus?.value,
          message: res?.data?.message,
        };

        setScannedData((prev) => [item, ...prev]);
      } catch {
        setScannedData((prev) => [
          {
            parcelBarcode: barcode,
            requestStatus: 1, // error
            message: "خطا در اسکن",
          },
          ...prev,
        ]);
      } finally {
        setTimeout(() => setModalMessage(null), MODAL_TIMEOUT);
      }
    },
    [mutation]
  );

  /* ---------------------------------- */
  /* 📦 Scan Queue Hook */
  /* ---------------------------------- */
  const { enqueueScan } = useScanQueue(scanProcessor, {
    cooldown: 1500,
    preventDuplicate: true,
  });

  /* ---------------------------------- */
  /* 📷 Camera Handler */
  /* ---------------------------------- */
  const handleCameraScan = (barcode: string) => {
    enqueueScan(barcode);
  };

  /* ---------------------------------- */
  /* 🧩 Render */
  /* ---------------------------------- */
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Camera */}
      <div className="absolute inset-0 z-0">
        <BarcodeScannerZXing height={cameraHeight} onScan={handleCameraScan} />
      </div>

      {/* Modal */}
      {modalMessage && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl p-4 px-6 shadow-lg font-semibold">
            {modalMessage}
          </div>
        </div>
      )}

      {/* Bottom Sheet */}
      <BottomSheet
        minHeight={BOTTOM_SHEET_MIN_HEIGHT}
        expandHeight={window.innerHeight * 0.9}
      >
        <div className="px-4 space-y-3 pb-8 overflow-y-auto">
          <h1 className="font-semibold">
            {mode === "delivery"
              ? "تحویل مرسوله یا باندل"
              : "پذیرش مرسوله یا باندل"}
          </h1>

          <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-2">
            {scannedData.map((item, index) => (
              <ScanCard
                key={item.parcelBarcode ?? item.bundleBarcode ?? index}
                item={item}
                mode={mode}
              />
            ))}
          </div>
        </div>
      </BottomSheet>
    </div>
  );
}

export default CameraScanForm;
