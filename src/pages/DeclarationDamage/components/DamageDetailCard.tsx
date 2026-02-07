import React from "react";
import { ReactComponent as EyeIcon } from "../../../components/icons/svg/eyeIcon.svg";
import ReportDetailModal from "./ReportDetailModal";
import {ReactComponent as ArrowIcon} from '../../../components/icons/svg/arrow-down.svg' ;
import { motion, AnimatePresence } from "framer-motion";


export type DamageReport = {
  damageReportId: number;
  parcelId: number;
  orderTypeTitle: string;
  customerBrandName: string;
  barcode: string;
  microhubName: string;
  createdDateTime: string;
  isSendable: string;
  damageTimeTypeTitle: string;
  damageParcelTypeTitle: string;
  parcelStatusTitle: string;
  fileUrls: string[];
};

type Props = {
  data: {
    data: {
      objectResult: DamageReport[];
    };
  };
};

function DamageDetailCard({ data }: Props) {
  const [openReportDetail, setOpenReportDetail] = React.useState(false);
  const [selectedReport, setSelectedReport] =
    React.useState<DamageReport | null>(null);

  const items = data?.data?.objectResult?.slice(0, 3) || [];

  // آرایه وضعیت باز/بسته
  const [openStates, setOpenStates] = React.useState<boolean[]>(
    Array(items.length).fill(false)
  );

  const toggleItem = (index: number) => {
    setOpenStates((prev) => prev.map((o, i) => (i === index ? !o : o)));
  };

return (
  <div className="my-4">
    <span className="pr-3 font-semibold">آسیب مرسوله</span>

    {items.map((item, idx) => (
      <div
        key={idx}
        className="bg-[#F9F2F2] border rounded-2xl border-gray-300 m-2"
      >
        {/* سطر اصلی */}
        <div className="flex flex-row justify-between items-center p-2">
          <div className="flex flex-row gap-2">
            {item.microhubName} / {item.createdDateTime}
          </div>

          <div className="flex flex-row items-center gap-2">
            {/* دکمه مشاهده فایل */}
            <button
              onClick={() => {
                setSelectedReport(item);
                setOpenReportDetail(true);
              }}
              className="
                my-1 px-3
                py-2
                text-white text-xs 
                bg-[#ff7959] 
                flex flex-row gap-1 items-center 
                font-semibold rounded-[28px]
                whitespace-nowrap
              "
            >
              مشاهده فایل
              <EyeIcon className="w-4 h-4" />
            </button>

            {/* فلش باز/بسته */}
            <button onClick={() => toggleItem(idx)} className="p-1">
              <ArrowIcon
                className={`w-5 h-5 transition-transform duration-300 ${
                  openStates[idx] ? "rotate-180" : "rotate-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* بخش کشویی با انیمیشن */}
        <AnimatePresence>
          {openStates[idx] && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{
                duration: 0.35,
                ease: "easeInOut",
              }}
              className="overflow-hidden p-3 border-t border-gray-300 text-sm flex flex-col gap-2"
            >
              <div>
                <span className="font-semibold">نوع آسیب:</span>{" "}
                {item.damageParcelTypeTitle}
              </div>
              <div>
                <span className="font-semibold">زمان آسیب :</span>{" "}
                {item.damageParcelTypeTitle}
              </div>
              <div>
                <span className="font-semibold">وضعیت مرسوله:</span>{" "}
                {item.parcelStatusTitle}
              </div>

              <div>
                <span className="font-semibold">بارکد:</span> {item.barcode}
              </div>

              <div>
                <span className="font-semibold">قابل ارسال:</span>{" "}
                {item.isSendable}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}

    {openReportDetail && selectedReport && (
      <ReportDetailModal
        isOpen={openReportDetail}
        onClose={() => setOpenReportDetail(false)}
        selectedData={selectedReport}
      />
    )}
  </div>
);

}

export default DamageDetailCard;
