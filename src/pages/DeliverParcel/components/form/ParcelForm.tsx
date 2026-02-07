import React, { useState } from "react";
import BundleList from "./ParcelList";
import { ReactComponent as ScannIcon } from "../../../../components/icons/svg/scannIcon.svg";

import BarcodeScannerListener from "../../../../components/tools/scanner/BarcodeScannerListener";
function TaskManagerDetailForm() {
  const [activeButton, setActiveButton] = useState<string>("reception");
  const handleScan = (code: string) => {

  }
  return (
    <div>
      <BarcodeScannerListener onScan={handleScan} />

      <div className="pb-16">
        <BundleList activeButton={activeButton} className="" />
      </div>
    </div>
  );
}

export default TaskManagerDetailForm;
