import React from 'react';
import {ReactComponent as RoutingIcon} from '../../../components/icons/svg/routingIcon.svg';
import Button from '../button/Button';

interface CardProps {
  firstMissionOriginId: string;
  firstMissionOriginTitle: string;
  firstMissionDestinationTitle: string;
  firstMissionReciptionBundleCount: number;
  firstMissionDeliveryBundleCount: number;
  firstMissionIsSelected: any;
  firstMissionArrivalTime: number;
  firstMissionOnSelect: any;
  firstMissionMissionType: number;
  handleRoutingClick:()=>void;
  ///second
  secondMissionOriginId: string;
  secondMissionOriginTitle: string;
  secondMissionDestinationTitle: string;
  secondMissionReciptionBundleCount: number;
  secondMissionDeliveryBundleCount: number;
  secondMissionIsSelected: any;
  secondMissionArrivalTime: number;
  secondMissionOnSelect: any;
  secondMissionMissionType: number;
}

const CardList: React.FC<CardProps> = React.memo(
  ({
    handleRoutingClick,
    firstMissionOriginId,
    firstMissionOriginTitle,
    firstMissionDestinationTitle,
    firstMissionReciptionBundleCount,
    firstMissionDeliveryBundleCount,
    firstMissionIsSelected,
    firstMissionArrivalTime,
    firstMissionOnSelect,
    firstMissionMissionType,
    secondMissionOriginTitle,
    secondMissionDestinationTitle,
    secondMissionReciptionBundleCount,
    secondMissionDeliveryBundleCount,
    secondMissionIsSelected,
    secondMissionArrivalTime,
    secondMissionOnSelect,
    secondMissionMissionType,

  }) => {


    return (
      <>
        <div className="mb-[30px]">
          <div className="font-bold pb-4 border-b border-[#E5E7EB]">
            <span> ماموریت ها</span>
          </div>
          <div className="bg-white h-[270px] my-4 rounded-[16px] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-6 justify-between">
                <button
                  onClick={() => firstMissionOnSelect(firstMissionOriginId)}
                  className="font-bold text-black"
                >
                  {firstMissionOriginTitle}
                </button>
                <div
                  className={` h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border bg-[#FDF6B2] border-[#FACA15]`}
                >
                  <div className="text-right text-bold whitespace-nowrap leading-none text-[#111928]">
                    درحال انجام
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-6 justify-between pt-2">
              <span className="text-[#6B7280]">مبدا</span>
              <span>{firstMissionOriginTitle}</span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">مقصد</span>
              <span>{firstMissionDestinationTitle}</span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">پذیرش</span>
              <span className="inline-flex items-center gap-1">
                {firstMissionReciptionBundleCount} <span>باندل</span>
              </span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">تحویل</span>
              <span className="inline-flex items-center gap-1">
                {firstMissionDeliveryBundleCount} <span>باندل</span>
              </span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">زمان رسیدن</span>
              <span>{firstMissionArrivalTime}</span>
            </div>
            <button
              onClick={handleRoutingClick}
              className="bg-[#FF7959] w-full mx-auto flex items-center justify-center gap-2 py-2 rounded-[8px] mt-2"
            >
              <RoutingIcon />
              <span className="text-white">مسیر یابی</span>
            </button>
          </div>
        </div>
        {/* //// */}
        <div className="mb-[200px]">
          <div className="bg-white h-[270px] my-4 rounded-[16px] p-4">
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-6 justify-between">
                <span className="font-bold text-black">
                  {secondMissionDestinationTitle}
                </span>
                <div
                  className={` h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border bg-[#FDF6B2] border-[#FACA15]`}
                >
                  <div className="text-right text-bold whitespace-nowrap leading-none text-[#111928]">
                    در انتظار
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-6 justify-between pt-2">
              <span className="text-[#6B7280]">مبدا</span>
              <span>{secondMissionDestinationTitle}</span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">مقصد</span>
              <span>{secondMissionDestinationTitle}</span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">پذیرش</span>
              <span className="inline-flex items-center gap-1">
                {secondMissionReciptionBundleCount} <span>باندل</span>
              </span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">تحویل</span>
              <span className="inline-flex items-center gap-1">
                {secondMissionDeliveryBundleCount} <span>باندل</span>
              </span>
            </div>
            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">زمان رسیدن</span>
              <span>{secondMissionArrivalTime}</span>
            </div>
            <button
              disabled={true}
              className="bg-[#FFC9BD] w-full mx-auto flex items-center justify-center gap-2 py-2 rounded-[8px] mt-2"
            >
              <RoutingIcon />
              <span className="text-white">مسیر یابی</span>
            </button>
          </div>
        </div>
      </>
    );
  }
);

export default CardList;
