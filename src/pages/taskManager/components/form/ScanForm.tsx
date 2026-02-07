import React, { useEffect, useState, useRef } from "react";
import BarcodeScannerListener from "../../../../components/tools/scanner/BarcodeScannerListener";
import ScanData from "../modal/scanData";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { useReactMutation } from "../../../../components/hooks/query/useReactQuery";
import { ScanAcceptance, ScanDelivery } from "../../../../setting/ApiUrl";
import { useActiveButton } from "../../../../components/context/ActiveButtonContext";
import Loading from "../../../../components/tools/loading/Loading";

export type ScannedDataType = {
  parcelBarcode: string;
  bundleBarcode: string;
  scannedParcelCount: number;
  totalParcelCount: number;
  isSuccess: boolean;
  description: string;
  message: string;
  fleetName?: string;
  sort?: number;
};

function ScanForm() {
  const { activeButton } = useActiveButton();
  const [scannedDataModal, setScannedDataModal] = useState(false);
  const [scannedData, setScannedData] = useState<any[]>([]);
  const [queue, setQueue] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  const scanApiDetail = {
    url: ScanAcceptance,
    method: HttpMethod.POST,
  };

  const deliveryScanApiDetail = {
    url: ScanDelivery,
    method: HttpMethod.POST,
  };

  const apiDetail =
    activeButton === "acceptance" ? scanApiDetail : deliveryScanApiDetail;

  const { mutateAsync } = useReactMutation(apiDetail);

  const handleScan = (code: string) => {
    setQueue((prev) => [...prev, code]); // اضافه به صف
  };

  useEffect(() => {
    if (processing || queue.length === 0) return;

    const processNext = async () => {
      setProcessing(true);
      const nextCode = queue[0];

      try {
        const res = await mutateAsync({ barcode: nextCode });
        const result = res?.data;

        setScannedData((prev) => [
          ...prev,
          {
            parcelBarcode: result?.objectResult?.parcelBarcode || "",
            bundleBarcode: result?.objectResult?.bundleBarcode || "",
            scannedParcelCount: result?.objectResult?.scannedCount || 0,
            totalParcelCount: result?.objectResult?.totalCount || 0,
            isSuccess: res.data.requestStatus?.value,
            description: result?.objectResult?.description || "",
            message: result?.message || "خطای نامشخص",
            fleetName: result?.objectResult?.fleetName,
            sort: result?.objectResult?.sort,
          },
        ]);

        setScannedDataModal(true);
      } catch (error) {
        setScannedData((prev) => [
          ...prev,
          {
            parcelBarcode: nextCode,
            bundleBarcode: "",
            scannedParcelCount: 0,
            totalParcelCount: 0,
            isSuccess: false,
            description: "",
            message: "خطا در برقراری ارتباط",
          },
        ]);
        setScannedDataModal(true);
      } finally {
        setQueue((prev) => prev.slice(1)); // آیتم اول حذف
        setProcessing(false);
      }
    };

    processNext();
  }, [queue, processing, mutateAsync]);

  return (
    <div>
      <BarcodeScannerListener onScan={handleScan} />

      {scannedDataModal && (
        <ScanData
          activeButton={activeButton}
          isOpen={scannedDataModal}
          onClose={() => setScannedDataModal(false)}
          data={scannedData}
          isLoading={processing || queue.length > 0}
          pendingCount={queue.length}
        />
      )}
    </div>
  );
}

export default ScanForm;
