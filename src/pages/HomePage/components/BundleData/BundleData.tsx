import React, { useState } from "react";
import NumberCounter from "../../../../components/tools/counter/NumberCounter";
import TableCell from "../../../../components/tools/table/TableCell";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { ReactComponent as EmptyTaskManagementIcon } from "../../../../components/icons/svg/EmptyTaskIcon.svg";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetExpiredBundles } from "../../../../setting/ApiUrl";
import AcceptanceIcon from "../../../../components/icons/components/AcceptanceSvg";
import DeliveryIcon from "../../../../components/icons/components/DeliverySvg";
import Tag from "../../../../components/tools/tags/Tag";
import DynamicTable from "../../../../components/tools/table/DynamicTable";

function BundleData() {
  const [selectedDate, setSelectedDate] = useState<
    "acceptance" | "delivery" | "return"
  >("acceptance");
  type ServiceType = "بافر" | "بافرحمل";
  const [selectedService, setSelectedService] =
    useState<ServiceType>("بافرحمل");

  const apiDetails = {
    url: GetExpiredBundles,
    method: HttpMethod.POST,
    body: { orderTypeId: selectedService === "بافر" ? 1 : 2 },
  };

  const { data, isLoading } = useReactQuery(apiDetails);

  const filteredData =
    [data?.data?.objectResult]
      ?.map((item: any) => {
        if (!item) return [];
        const target =
          selectedDate === "acceptance"
            ? item.acceptance
            : selectedDate === "delivery"
            ? item.delivery
            : item.return;
        if (!target) return [];
        return target.map((subItem: any) => ({
          origin: subItem,
          id: subItem.bundleId,
          bundleId: <TableCell>{subItem.bundleId}</TableCell>,
          phoneNumber: <TableCell>{subItem.phoneNumber}</TableCell>,
          name: <TableCell>{subItem.name}</TableCell>,
          serviceType: (
            <Tag
              categoryName="orderType"
              id={subItem.serviceTypeId}
              className="custom-class"
            />
          ),
          parcel: (
            <NumberCounter
              value1={subItem.totalParcelCount}
              value2={subItem.scannedCount}
            />
          ),
          deliverTimeWindow: <TableCell>{subItem.deliverTimeWindow}</TableCell>,
          bundleStatus: (
            <Tag
              categoryName="bundleStatus"
              id={subItem.bundleStatusId}
              className="custom-class"
            />
          ),
          button: (
              <a 
                href={`tel:${subItem.phoneNumber}`} 
                className="px-3 py-1 bg-[#FF7959] text-white rounded-md text-sm font-medium inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                تماس با راننده
              </a>
            ),
        }));
      })
      .flat() || [];

  // اگر هیچ دیتایی نباشه

  return (
    <div className="my-4 mb-8">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          {/* پذیرش */}
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              selectedDate === "acceptance"
                ? "text-[#FF7959]"
                : "text-gray-700 "
            }`}
            onClick={() => setSelectedDate("acceptance")}
          >
            <AcceptanceIcon
              color={selectedDate === "acceptance" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2"> پذیرش (ورودی)</span>
          </button>

          {/* تحویل */}
          <button
            className={`flex flex-col items-center px-4 py-2 rounded-md ${
              selectedDate === "delivery" ? "text-[#FF7959]" : "text-gray-700 "
            }`}
            onClick={() => setSelectedDate("delivery")}
          >
            <DeliveryIcon
              color={selectedDate === "delivery" ? "#FF7959" : "#6B7280"}
            />
            <span className="pt-2"> تحویل (خروجی)</span>
          </button>
        </div>

        <div className="mb-4 flex justify-start">
          <div className="relative inline-block">
            <select
              value={selectedService}
              onChange={(e) =>
                setSelectedService(e.target.value as ServiceType)
              }
              className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-[#FF7959] focus:border-transparent"
            >
              <option value="بافر">بافر</option>
              <option value="بافرحمل">بافرحمل</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {!isLoading && (!filteredData || filteredData.length === 0) ? (
        <div className="flex flex-col items-center justify-center h-full py-10 text-gray-500">
          <EmptyTaskManagementIcon className="w-80 h-80 mb-4" />
          <p className="text-lg font-medium">فعلا خبری نیست!</p>
          <p className="text-sm">هنوز هیچ تسکی تعریف نشده است.</p>
        </div>
      ) : (
        <DynamicTable
          rowKey="id"
          pagination={false}
          rowClassName="border-2 border-solid border-[#E5E7EB]"
          className="mt-[24px]"
          headers={[
            { key: "id", label: "ID", hidden: true },
            { key: "bundleId", label: "کد باندل", sortable: true },
            { key: "phoneNumber", label: "شماره تماس", sortable: false },
            { key: "name", label: "نام مشتری", sortable: true },
            { key: "serviceType", label: "نوع سرویس", sortable: true },
            { key: "parcel", label: "مرسوله ها", sortable: false },
            {
              key: "deliverTimeWindow",
              label: "پنجره زمانی تحویل",
              sortable: false,
            },
            { key: "bundleStatus", label: "وضعیت باندل", sortable: false },
            { key: "button", label: "", sortable: false },
          ]}
          data={filteredData}
          selectionMode="single"
        />
      )}
    </div>
  );
}

export default BundleData;
