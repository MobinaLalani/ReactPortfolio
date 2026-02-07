import React, { useState } from "react";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetTimeWindowsChart } from "../../../../setting/ApiUrl";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

// Type definitions
interface ChartData {
  name: string;
  acceptance: number;
  delivery: number;
}

interface ServiceChartData {
  serviceTypeId: number;
  charts: ChartData[];
}

interface ServiceTypeOption {
  id: number;
  name: string;
}

// Custom tooltip formatter
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-200 min-w-[140px] sm:min-w-[180px]">
        <p className="font-bold text-gray-800 mb-1 sm:mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p
            key={`item-${index}`}
            className="text-xs sm:text-sm"
            style={{ color: entry.color }}
          >
            {`${entry.name}: ${entry.value.toLocaleString()}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

function Barchart() {
  // Service type options
  const serviceTypeOptions: ServiceTypeOption[] = [
    { id: 1, name: "بافر" },
    { id: 2, name: "بافرحمل" },
    { id: 5, name: "اکسپرس" },
  ];

  // State for selected service type
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);

  // Fetch data from API
  const apiDetails = {
    url: GetTimeWindowsChart,
    method: HttpMethod.GET,
  };

  const { data, isLoading, isError } = useReactQuery(apiDetails);

  // Transform data for chart display
  const transformData = (charts: ChartData[]) => {
    return charts.map((item) => ({
      name: item.name,
      تحویل: item.delivery,
      پذیرش: item.acceptance,
    }));
  };

  // Get current data based on selected service type
  const getCurrentData = () => {
    if (data?.data?.objectResult && data.data.objectResult.length > 0) {
      const serviceData: ServiceChartData | undefined = data.data.objectResult.find(
        (item: ServiceChartData) => item.serviceTypeId === selectedServiceId
      );
      return serviceData ? transformData(serviceData.charts) : [];
    }
    return [];
  };

  const currentData = getCurrentData();

  return (
    <div className=" my-5 rounded-xl shadow-lg p-3 sm:p-4 h-[400px] sm:h-[550px] transition-all duration-300 hover:shadow-xl">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-gray-800 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[#FF7959]"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="3" y1="9" x2="21" y2="9"></line>
          <line x1="9" y1="21" x2="9" y2="9"></line>
        </svg>
        نمودار روزانه مرسولات
      </h3>

      {/* Service selection dropdown */}
      <div className="mb-4 flex justify-start">
        <div className="relative inline-block">
          <select
            value={selectedServiceId}
            onChange={(e) => setSelectedServiceId(Number(e.target.value))}
            className="appearance-none bg-white border border-gray-300 text-gray-700 py-1 px-4 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-[#FF7959] focus:border-transparent"
          >
            {serviceTypeOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
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

      {/* Loading state */}
      {isLoading && (
        <div className="flex items-center justify-center h-[80%] text-gray-500">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF7959]"></div>
            <span className="mt-2 text-sm">در حال بارگذاری داده‌ها...</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="flex items-center justify-center h-[80%] text-red-500">
          خطا در دریافت داده‌ها
        </div>
      )}

      {/* Chart content */}
      {!isLoading && !isError && (
        <ResponsiveContainer width="100%" height="80%">
          {currentData && currentData.length > 0 ? (
            <BarChart
              data={currentData}
              margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
              barGap={4}
              barCategoryGap={12}
            >
              <CartesianGrid
                strokeDasharray="2 2"
                stroke="#d1d5db"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#666"
                tick={{ fontSize: 10, fill: "#555" }}
                axisLine={{ stroke: "#eaeaea" }}
              />
              <YAxis
                stroke="#666"
                tick={{ fontSize: 10, fill: "#555" }}
                axisLine={{ stroke: "#eaeaea" }}
                tickLine={false}
                tickMargin={20}
                tickFormatter={(value) =>
                  value >= 1000 ? `${value / 1000}k` : value
                }
              />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
              />
              <Legend
                wrapperStyle={{ paddingTop: 8 }}
                iconSize={14}
                formatter={(value) => (
                  <span className="mr-2 text-xs sm:text-sm text-gray-700">
                    {value}
                  </span>
                )}
              />

              <Bar dataKey="تحویل" fill="#FF7959" radius={[4, 4, 0, 0]} />
              <Bar dataKey="پذیرش" fill="#481B6B" radius={[4, 4, 0, 0]} />
            </BarChart>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              <span className="text-sm">داده‌ای برای نمایش وجود ندارد</span>
            </div>
          )}
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default Barchart;
