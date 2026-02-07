import React, { useState } from "react";
import DropdownSelector from "../../../../components/tools/button/DropdownSelector";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetFleetMissions } from "../../../../setting/ApiUrl";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { ReactComponent as RoutingIcon } from "../../../../components/icons/svg/routingIcon.svg";
import Tag from "../../../../components/tools/tags/Tag";
import StatusTabs from "../../../../components/tools/toggle-switch/StatusTabs";
import Loading from "../../../../components/tools/loading/Loading";

function MissionForm() {
  const [selectedDate, setSelectedDate] = useState("1");
  const [selectedTab, setSelectedTab] = useState("inProgress");

  const apiDetails = {
    url: GetFleetMissions,
    method: HttpMethod.POST,
    body: { dateFilterId: Number(selectedDate) },
  };

  const { data, isLoading, isError, error } = useReactQuery(apiDetails);

  // لیست دیتا بر اساس تب انتخاب شده
  const missions = data?.data?.[selectedTab] ?? [];

  return (
    <div className="pt-4">
      {/* DropdownSelector همیشه id رو نگه می‌داره */}
      <DropdownSelector value={selectedDate} onChange={setSelectedDate} />

      {/* StatusTabs تب فعال رو به parent می‌ده */}
      <StatusTabs value={selectedTab} onChange={setSelectedTab} />

      {/* لودینگ */}
      {isLoading && (
        <div className=" pt-10 my-4 text-center justify-center font-semibold flex h-[150px]">
          <Loading />
        </div>
      )}

      {/* خطا */}
      {isError && (
        <div className="text-red-500 my-4">
          خطا در دریافت داده‌ها: {String(error)}
        </div>
      )}

      {/* وقتی لیست خالی باشه */}
      {!isLoading && !isError && missions.length === 0 && (
        <div className="text-gray-500 pt-10 my-4 text-center justify-center font-semibold flex h-[150px]">
          دیتایی وجود ندارد
        </div>
      )}

      {/* وقتی دیتا وجود داشته باشه */}
      {!isLoading &&
        !isError &&
        missions.length > 0 &&
        missions.map((item: any) => (
          <div
            key={item.id}
            className="bg-white h-[270px] my-4 rounded-[16px] p-4"
          >
            <div className="flex flex-col gap-3">
              <div className="flex flex-row gap-6 justify-between">
                <button className="font-bold text-black">
                  {item.destinationTitle}
                </button>
                <Tag
                  categoryName="missionStatus"
                  id={item.missionStatus.id}
                  className="custom-class"
                />
              </div>
            </div>

            <div className="flex flex-row gap-6 justify-between pt-2">
              <span className="text-[#6B7280]">مبدا</span>
              <span>{item.originTitle}</span>
            </div>

            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">مقصد</span>
              <span>{item.destinationTitle}</span>
            </div>

            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">پذیرش</span>
              <span className="inline-flex items-center gap-1">
                {item.receptionBundleCount} <span>باندل</span>
              </span>
            </div>

            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">تحویل</span>
              <span className="inline-flex items-center gap-1">
                {item.deliveryBundleCount} <span>باندل</span>
              </span>
            </div>

            <div className="flex flex-row gap-6 justify-between mt-2">
              <span className="text-[#6B7280]">زمان رسیدن</span>
              <span>{item.arrivalTime}:00</span>
            </div>

            <button className="bg-[#FF7959] w-full mx-auto flex items-center justify-center gap-2 py-2 rounded-[8px] mt-2">
              <RoutingIcon />
              <span className="text-white">مسیر یابی</span>
            </button>
          </div>
        ))}
    </div>
  );
}

export default MissionForm;
