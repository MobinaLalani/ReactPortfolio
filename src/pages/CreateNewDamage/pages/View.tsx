import React from "react";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import CreateNewDamage from "../components/CreateNewDamage";

// Mock data for cards

const View: React.FC = () => {
  return (
    <>
      <MissionDetailLayout
        Title={"ایجاد گزارش جدید آسیب مرسوله"}
        content={<CreateNewDamage/>}
      />
    </>
  );
};

export default View;
