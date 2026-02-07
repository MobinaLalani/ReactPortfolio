import React from "react";
import { GetDashboardCounts } from "../../../../setting/ApiUrl";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";

import CardItem from "./CardItem";

function CardList() {
  const scanApiDetail = {
    url: GetDashboardCounts,
    method: HttpMethod.GET,
  };

  const {
    data: scanData,
    isError: scanIsError,
    error: scanError,
    isLoading,
  } = useReactQuery(scanApiDetail);

  const result = scanData?.data?.objectResult;

  if (isLoading) return <div>در حال بارگذاری...</div>;
  if (scanIsError) return <div>خطا در دریافت داده‌ها</div>;
  if (!result) return <div>داده‌ای یافت نشد</div>;

  const cards = [
    {
      id: "card-1",
      title: result.pendingDeliveryCount,
      textColor: "text-black",
      descriptionTextColor: "text-black",
      description: "مرسوله‌های آماده تحویل",
      backgroundColor: "bg-[#FFC9BD]",
      onClick: () => console.log("مرسوله‌های آماده تحویل"),
    },
    {
      id: "card-2",
      title: result.temporaryBufferCount,
      textColor: "text-white",
      descriptionTextColor: "text-white",
      description: "مرسوله‌های در انتظار تحویل موقت",
      backgroundColor: "bg-[#0E9F6E]",
      onClick: () => console.log("تحویل موقت"),
    },
    {
      id: "card-3",
      title: result.ordersCount,
      textColor: "text-white",
      descriptionTextColor: "text-white",
      description: "سفارش‌های ثبت‌شده",
      backgroundColor: "bg-[#3F83F8]",
      onClick: () => console.log("سفارش‌های ثبت‌شده"),
    },
    {
      id: "card-4",
      title: result.returnedParcelsCount,
      textColor: "text-white",
      descriptionTextColor: "text-white",
      description: "مرسوله‌های مرجوعی",
      backgroundColor: "bg-[#F05252]",
      onClick: () => console.log("مرسوله‌های مرجوعی"),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {cards.map((card) => (
        <CardItem
          key={card.id}
          id={card.id}
          title={String(card.title ?? 0)} // اطمینان از تبدیل به string
          textColor={card.textColor}
          description={card.description}
          descriptionTextColor={card.descriptionTextColor}
          backgroundColor={card.backgroundColor}
          onClick={card.onClick}
        />
      ))}
    </div>
  );
}

export default CardList;
