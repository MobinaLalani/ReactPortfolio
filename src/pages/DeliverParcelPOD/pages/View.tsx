import React from "react";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import DeliverParcelPOD from "../components/DeliverParcelPOD";


const View: React.FC = () => {
  return (
    <>
      <MissionDetailLayout
        Title={"تحویل مرسوله با کد"}
        content={<DeliverParcelPOD/>}
      />
    </>
  );
};

export default View;
