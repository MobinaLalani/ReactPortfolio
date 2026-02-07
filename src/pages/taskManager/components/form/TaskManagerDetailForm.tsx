import React, { useState } from "react";
import BundleList from "./BundleList";


import FilterBox from "./FilterBox";
import ScanForm from "./ScanForm";
function TaskManagerDetailForm() {

  return (
    <div>
      <ScanForm />

      <FilterBox />
      <BundleList />
    </div>
  );
}

export default TaskManagerDetailForm;
