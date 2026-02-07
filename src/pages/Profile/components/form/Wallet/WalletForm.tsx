import React from "react";
import BankCard from "../../../../../assets/images/BankCard.png";
import TransactionList from "./TransactionList";

function WalletForm() {
  return (
    <div className="flex justify-center items-center h-full w-full flex-col gap-8">
      <div className="relative w-full max-w-md">
        <img
          src={BankCard}
          alt="Bank Card"
          className="w-full h-auto rounded-xl shadow-lg"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center">
          <h2 className="text-xl md:text-2xl font-bold">موجودی کیف پول شما</h2>
          <p className="text-sm md:text-base mt-1">۵,۰۰۰,۰۰۰ تومان</p>
        </div>
      </div>
      <TransactionList/>
    </div>
  );
}

export default WalletForm;
