import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import HomeSvg from "../../icons/components/HomeSvg";
import TaskManagerSvg from "../../icons/components/TaskManagerSvg";
import BarcodeSvg from "../../icons/components/BarcodeSvg";
import AccountSvg from "../../icons/components/AccountSvg";
import DeliverParcelSvg from "../../icons/components/DeliverParcelSvg";
import Mission from "../../icons/components/Mission";


const Navigation = () => {
  const [activeTab, setActiveTab] = useState("home");
  const navigate = useNavigate(); 

  const handleClick = (tab: string, path: string) => {
    setActiveTab(tab);
    navigate(path);
  };

  return (
    <div className="absolute bottom-0 left-0 w-full px-5 pb-5 pt-2 bg-white">
      <div className="flex gap-3 w-full h-16 bg-transparent rounded-[16px] justify-center items-center">
        <button
          onClick={() => handleClick("taskManager", "/taskManager")}
          className={`p-3 rounded-[12px] ${
            activeTab === "taskManager" ? "bg-[#FF7959]" : "bg-white"
          }`}
        >
          <TaskManagerSvg
            strokeColor={activeTab === "taskManager" ? "#ffffff" : "#6B7280"}
          />
        </button>
        <button
          onClick={() => handleClick("home", "/home")}
          className={`p-3 rounded-[12px] ${
            activeTab === "home" ? "bg-[#FF7959]" : "bg-white"
          }`}
        >
          <HomeSvg strokeColor={activeTab === "home" ? "#ffffff" : "#6B7280"} />
        </button>
        <button
          onClick={() => handleClick("DeliverParcel", "/DeliverParcel")}
          className={`p-3 rounded-[12px] ${
            activeTab === "DeliverParcel" ? "bg-[#FF7959]" : "bg-white"
          }`}
        >
          <DeliverParcelSvg
            color={activeTab === "DeliverParcel" ? "#ffffff" : "#6B7280"}
          />
        </button>

        <button
          onClick={() => handleClick("barcode", "/Order/createOrder")}
          className={`p-3 rounded-[12px] ${
            activeTab === "barcode" ? "bg-[#FF7959]" : "bg-white"
          }`}
        >
          <Mission
            strokeColor={activeTab === "barcode" ? "#ffffff" : "#6B7280"}
          />
        </button>
        {/* <button
          onClick={() => handleClick("account", "/profile")}
          className={`p-3 rounded-[12px] ${
            activeTab === "account" ? "bg-[#FF7959]" : "bg-white"
          }`}
        >
          <AccountSvg
            strokeColor={activeTab === "account" ? "#ffffff" : "#6B7280"}
          />
        </button> */}
      </div>
    </div>
  );
};

export default Navigation;
