import React from "react";
import { ReactComponent as MinusIcon } from "../../../../../components/icons/svg/minusIcon.svg";
import { ReactComponent as PlusIcon } from "../../../../../components/icons/svg/plusIcon.svg";

function TransactionCard({ data }: { data: any }) {
  const formatNumber = (amount: number) => {
    return amount.toLocaleString("fa-IR");
  };

  const isSuccessful = data?.transactionStatus?.id === 1;
  const amount = formatNumber(data?.amount);

  return (
    <div className="bg-white rounded-[12px] px-4 py-5 min-w-[280px] w-full max-w-md my-4 shadow-sm flex-col gap-2">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center font-semibold gap-2">
          {isSuccessful ? (
            <PlusIcon className="w-6 h-6 text-green-600" /> // بزرگ‌تر از پیش‌فرض
          ) : (
            <MinusIcon className="w-6 h-6 text-red-600" />
          )}

          <span
            className={`${isSuccessful ? "text-green-600" : "text-red-600"}`}
          >
            {data?.transactionStatus?.title}
          </span>
        </div>

        <div className="font-bold flex items-baseline gap-1">
          <span className={isSuccessful ? "text-green-600" : "text-red-600"}>
            {amount}
            {isSuccessful ? "+" : "-"}
          </span>
          <span className="text-[#6B7280]">تومان</span>
        </div>
      </div>
      <div className="text-end">
        <span className="text-[#6B7280]">{data?.createdDate}</span>
      </div>
    </div>
  );
}

export default TransactionCard;
