import React, { useEffect, useState } from "react";
import { useToggle } from "../../hooks/toggle/useToggle";
import CardList from "./CardList";
import { data, useNavigate } from "react-router-dom";
import useStore from "../../../store/zustand/store";
import RoutingModal from "../modal/routingModal";

function CardListView({ cards =[] ,onCardSelect, errorPage }: any) {
  const [isOpen,setIsOpen] =useState(false);
  const navigate = useNavigate();
  const toggle = useToggle();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const setSelectedItem = useStore((state) => state.setSelectedItem);
  useEffect(() => {
    if (selectedId) {
      const selectedCard = cards.find((card: any) => card.id === selectedId);
      if (selectedCard) {
      
      }
    }
  }, [cards, selectedId]);
  const handleRoutingClick = () => {
    setIsOpen(true)

    // const destination = {
    //   lat: 35.6892,   
    //   lng: 51.389,
    //   name: "محل تحویل",
    // };
  
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(
    //     (position) => {
    //       const userLat = position.coords.latitude;
    //       const userLng = position.coords.longitude;

    //       // ساخت لینک نشان با مقصد
    //       const neshanUrl = `https://nshn.ir/destination?lat=${
    //         destination.lat
    //       }&lng=${destination.lng}&name=${encodeURIComponent(destination.name)}`;
    //       window.open(neshanUrl, "_blank");
    //     },
    //     (error) => {
    //       console.error("خطا در دریافت موقعیت کاربر:", error);
  
    //       // حتی در صورت خطا، لینک مقصد رو باز کن
    //       const fallbackUrl = `https://nshn.ir/destination?lat=${
    //         destination.lat
    //       }&lng=${destination.lng}&name=${encodeURIComponent(destination.name)}`;
    //       window.open(fallbackUrl, "_blank");
    //     }
    //   );
    // } else {
    //   alert("دستگاه شما موقعیت‌یاب را پشتیبانی نمی‌کند.");
    // }
  };
  const handleCardSelect = (firstMissionOriginId:any) => {
   navigate(`/missionDetails/${firstMissionOriginId}`);
    // setSelectedId(id);   
    // toggle();

   
  };

    if (!cards || cards.length === 0) {
    return (
      <div className="flex flex-col gap-[25px] w-full pb-[40px] mt-[25px]">
        {errorPage}
      </div>
    ); 
  }

  return (
    <div className="flex flex-col gap-[25px] w-full pb-[40px] mt-[25px]">
      {[cards].map((card: any,index: number) => (
        <CardList
          key={index} 
          handleRoutingClick={handleRoutingClick}
          firstMissionOriginId={card.firstMission?.originId}
          firstMissionOriginTitle={card.firstMission?.originTitle}
          firstMissionDestinationTitle={card.firstMission?.destinationTitle}
          firstMissionReciptionBundleCount={
            card.firstMission?.reciptionBundleCount
          }
          firstMissionDeliveryBundleCount={
            card.firstMission?.deliveryBundleCount
          }
          firstMissionArrivalTime={card.firstMission?.arrivalTime}
          firstMissionMissionType={card.firstMission?.missionType}
          firstMissionIsSelected={selectedId === card.firstMission?.originId}
          firstMissionOnSelect={handleCardSelect}
          secondMissionOriginId={card.secondMission?.originId}
          secondMissionOriginTitle={card.secondMission?.originTitle}
          secondMissionDestinationTitle={card.secondMission?.destinationTitle}
          secondMissionReciptionBundleCount={
            card.secondMission?.reciptionBundleCount
          }
          secondMissionDeliveryBundleCount={
            card.secondMission?.deliveryBundleCount
          }
          secondMissionArrivalTime={card.secondMission?.arrivalTime}
          secondMissionMissionType={card.secondMission?.missionType}
          secondMissionIsSelected={selectedId === card.secondMission?.originId}
          secondMissionOnSelect={handleCardSelect}
        />
      ))}
      <RoutingModal isOpen={isOpen} onClose={() => setIsOpen(false)} latitude={cards?.firstMission?.latitude} longitude={cards?.firstMission?.latitude}/>
    </div>
  );
}

export default CardListView;
