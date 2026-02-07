import React from "react";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import DeclarationDamage from "../components/DeclarationDamage";

// Mock data for cards

const View: React.FC = () => {
  return (
    <>
      <MissionDetailLayout
        Title={"رهگیری آسیب دیدگی"}
        content={
         <DeclarationDamage/>
        }
      />
    </>
  );
};

export default View;
