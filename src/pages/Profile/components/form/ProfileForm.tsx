import React, { useState, Suspense, lazy } from "react";
import AvatarImage from "../../../../assets/images/AvatarImage.png";

// lazy loading برای بهبود performance
const PersonalForm = lazy(() => import("./PersonalForm"));
const CarForm = lazy(() => import("./CarForm"));
const WalletForm = lazy(() => import("./Wallet/WalletForm"));

function ProfileForm() {
  const [activeButton, setActiveButton] = useState<
    "personal" | "vehicle" | "wallet"
  >("personal");

  const buttons = [
    { label: "شخصی", value: "personal" },
    { label: "خودرو", value: "vehicle" },
    { label: "کیف پول", value: "wallet" },
  ];

  return (
    <div>
      {/* Toggle Buttons */}
      <div className="flex flex-row justify-center w-full gap-2 items-center my-2">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            className={`flex-1 rounded-[28px] py-2 transition-colors duration-200 ${
              activeButton === btn.value
                ? "bg-[#FF7959] text-white"
                : "bg-[#E5E7EB] text-black"
            }`}
            onClick={() => setActiveButton(btn.value as typeof activeButton)}
          >
            <span className="font-semibold">{btn.label}</span>
          </button>
        ))}
      </div>

      {/* Forms */}
      <div className="mt-4">
        <Suspense
          fallback={<div className="text-gray-500">در حال بارگذاری...</div>}
        >
          {activeButton === "personal" && <PersonalForm />}
          {activeButton === "vehicle" && <CarForm />}
          {activeButton === "wallet" && <WalletForm />}
        </Suspense>
      </div>
    </div>
  );
}

export default ProfileForm;
