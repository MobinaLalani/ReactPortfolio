import React, { useState } from "react";
import BundleList from "./ParcelList";
import { useParams, useLocation } from "react-router-dom";
import { ReactComponent as ScannIcon } from "../../../../components/icons/svg/scannIcon.svg";

import BarcodeScannerListener from "../../../../components/tools/scanner/BarcodeScannerListener";
function TaskManagerDetailForm() {
  const [activeButton, setActiveButton] = useState<string>("reception");
  const { bundleId } = useParams();
  const location = useLocation();
  const { bundleBarcode } = location.state as { bundleBarcode?: string };
  const handleScan = (code: string) => {

  }
  return (
    <div>
      <BarcodeScannerListener onScan={handleScan} />
      <div className="flex flex-row justify-between items-center mb-6 ">
      </div>
      <BundleList activeButton={activeButton} />
    </div>
  );
}

export default TaskManagerDetailForm;
