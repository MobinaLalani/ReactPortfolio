import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ReactComponent as ArrowIcon } from "../../../../components/icons/svg/arrow-down.svg";
import CustomCheckbox from "../../../../components/tools/checkbox/CheckBox";
import Tag from "../../../../components/tools/tags/Tag";
import {
  useDynamicAnimation,
  createDynamicContainerVariants,
  createDynamicItemVariants,
} from "../../../../components/hooks/animation/useDynamicAnimation";

interface Parcel {
  id: number;
  barcode: string;
  orderTypeId: any;
  createdDate: string;
  receptionTimeWindow: string;
  customerBrandName: string;
  parcelStatus: any;
}

export interface Bundle {
  lastNodeName: string;
  orderTypeId: any;
  totalCount: number;
  receptionCount: number;
  customerBrandName: string;
  deliveryCount: number;
  parcels: Parcel[];
}

interface BundleCardProps extends Bundle {
  isOpen: boolean;
  onToggle: () => void;
  onSelectionChange: (ids: number[]) => void;
}

const ParcelCard: React.FC<BundleCardProps> = ({
  lastNodeName,
  totalCount,
  customerBrandName,
  orderTypeId,
  receptionCount,
  deliveryCount,
  parcels,
  isOpen,
  onToggle,
  onSelectionChange,
}) => {
  const [bundleChecked, setBundleChecked] = useState(false);
  const [parcelChecked, setParcelChecked] = useState<Record<number, boolean>>(
    {}
  );

  // پس از آپدیت شدن لیست پارسل‌ها (مثلاً بعد از تایید تحویل و رفرش)، انتخاب‌ها پاک شوند
  useEffect(() => {
    setBundleChecked(false);
    setParcelChecked({});
  }, [parcels]);

  const handleBundleCheck = () => {
    // اگر هیچ پارسل مجازی وجود ندارد، کاری انجام نده
    if (!parcels.some((p) => p.parcelStatus.id === 4)) {
      return;
    }

    const newChecked = !bundleChecked;
    setBundleChecked(newChecked);

    const newParcelChecked: Record<number, boolean> = {};
    parcels.forEach((p) => {
      newParcelChecked[p.id] = newChecked && p.parcelStatus.id === 4;
    });
    setParcelChecked(newParcelChecked);

    const ids = newChecked
      ? parcels.filter((p) => p.parcelStatus.id === 4).map((p) => p.id)
      : [];
    onSelectionChange(ids);
  };

  const handleParcelCheck = (id: number) => {
    const parcel = parcels.find((p) => p.id === id);

    if (!parcel || parcel.parcelStatus.id !== 2) {
      return;
    }

    const newParcelChecked = { ...parcelChecked, [id]: !parcelChecked[id] };
    setParcelChecked(newParcelChecked);

    const eligibleParcels = parcels.filter((p) => p.parcelStatus.id === 4);
    const allEligibleChecked = eligibleParcels.every(
      (p) => newParcelChecked[p.id]
    );
    setBundleChecked(allEligibleChecked);

    const selectedIds = parcels
      .filter((p) => newParcelChecked[p.id] && p.parcelStatus.id === 4)
      .map((p) => p.id);

    onSelectionChange(selectedIds);
  };

  const animationConfig = useDynamicAnimation({
    itemCount: parcels.length,
    maxItemsForFullAnimation: 30,
    maxItemsForStagger: 100,
    minStaggerDelay: 0.005,
    maxStaggerDelay: 0.05,
  });

  const containerVariants = createDynamicContainerVariants(animationConfig);
  const itemVariants = createDynamicItemVariants(animationConfig);

  return (
    <div className="bg-white rounded-[13px] flex flex-col w-full px-4 py-3 mb-4 shadow-md">
      {/* Header */}
      <div className="flex flex-row justify-between items-center cursor-pointer">
        <div
          className="flex flex-row items-center gap-4"
          onClick={handleBundleCheck}
        >
          <div className="w-7 h-7">
            <CustomCheckbox
              checked={bundleChecked}
              disabled={!parcels.some((p) => p.parcelStatus.id === 4)}
              className="w-full h-full"
            />
          </div>

          <div className="flex flex-col gap-1 w-full">
            <div className="flex flex-row justify-between items-center">
              <span className="font-semibold text-lg">{lastNodeName}</span>

              <Tag categoryName="orderType" id={orderTypeId} />
            </div>
            <span className="text-[#6B7280] text-sm">
              کل: <span className="text-black font-semibold">{totalCount}</span>{" "}
              | تحویل شده:{" "}
              <span
                className={`${
                  deliveryCount === 0 ? "text-red-500" : "text-green-600"
                } font-semibold`}
              >
                {deliveryCount}
              </span>{" "}
              | آماده تحویل:{" "}
              <span
                className={`${
                  receptionCount === 0 ? "text-red-500" : "text-green-600"
                } font-semibold`}
              >
                {receptionCount}
              </span>
            </span>
          </div>
        </div>

        {/* فلش */}
        <ArrowIcon
          onClick={onToggle}
          className={`${
            isOpen ? "rotate-180" : ""
          } w-4 h-4 transition-transform duration-300`}
        />
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <>
            {animationConfig.enableItemAnimation ? (
              <motion.div
                variants={containerVariants}
                initial="closed"
                animate="open"
                exit="closed"
                className="overflow-hidden mt-3 flex flex-col gap-2"
              >
                {parcels.map((parcel) => (
                  <motion.div
                    key={parcel.id}
                    variants={itemVariants}
                    className={`border border-gray-300 rounded-[13px] px-3 py-2 flex flex-row justify-between items-center ${
                      parcel.parcelStatus.id !== 4
                        ? "opacity-60 bg-gray-50"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div
                        className="w-5 h-5"
                        onClick={
                          parcel.parcelStatus.id === 4
                            ? () => handleParcelCheck(parcel.id)
                            : undefined
                        }
                      >
                        <CustomCheckbox
                          checked={parcelChecked[parcel.id] || false}
                          disabled={parcel.parcelStatus.id !== 4}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{parcel.barcode}</span>
                        <span className="text-xs text-gray-500">
                          {parcel.customerBrandName} |{" "}
                          {parcel.receptionTimeWindow}
                        </span>
                      </div>
                    </div>
                    <Tag
                      categoryName="parcelStatus"
                      id={parcel.parcelStatus.id}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              // 👇 حالت بدون انیمیشن
              <div className="overflow-hidden mt-3 flex flex-col gap-2">
                {parcels.map((parcel) => (
                  <div
                    key={parcel.id}
                    className={`border border-gray-300 rounded-[13px] px-3 py-2 flex flex-row justify-between items-center ${
                      parcel.parcelStatus.id !== 4
                        ? "opacity-60 bg-gray-50"
                        : ""
                    }`}
                  >
                    <div className="flex flex-row items-center gap-3">
                      <div
                        className="w-5 h-5"
                        onClick={
                          parcel.parcelStatus.id === 4
                            ? () => handleParcelCheck(parcel.id)
                            : undefined
                        }
                      >
                        <CustomCheckbox
                          checked={parcelChecked[parcel.id] || false}
                          disabled={parcel.parcelStatus.id !== 4}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{parcel.barcode}</span>
                        <span className="text-xs text-gray-500">
                          {parcel.customerBrandName} |{" "}
                          {parcel.receptionTimeWindow}
                        </span>
                      </div>
                    </div>
                    <Tag
                      categoryName="parcelStatus"
                      id={parcel.parcelStatus.id}
                    />
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParcelCard;
