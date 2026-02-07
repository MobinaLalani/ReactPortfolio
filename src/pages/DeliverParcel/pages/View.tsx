import React from "react";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import TaskManagerDetailForm from "../components/form/ParcelForm";
const View: React.FC = () => {

  return(
    <>
      <MissionDetailLayout
        Title={''}
        content={<TaskManagerDetailForm />}
      />
    </>
  );
};

export default View;
