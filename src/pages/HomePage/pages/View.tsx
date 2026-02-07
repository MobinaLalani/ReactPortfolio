import React from "react";
import MissionDetailLayout from "../../../components/layout/view/MissionDetailLayout";
import BundleData from "../components/BundleData/BundleData";
import GaugeChart from "../components/Chart/GaugeChart";

import Barchart from "../components/Chart/Barchart";
import CardList from "../components/Card/CardList";

// Mock data for cards

const View: React.FC = () => {
  return (
    <>
      <MissionDetailLayout
        Title={"داشبورد"}
        content={
          <>
            <CardList />
            <Barchart />
            <GaugeChart/>
            <div className="mt-[80px]">
              <BundleData />
            </div>
          </>
        }
      />
    </>
  );
};

export default View;
