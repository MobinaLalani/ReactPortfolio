import React, { useEffect, useState } from "react";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import { GetParcelsChart } from "../../../../setting/ApiUrl";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

interface GaugeChartProps {
  size?: "sm" | "md" | "lg" | "xl";
}

const GaugeChart: React.FC<GaugeChartProps> = ({ size = "md" }) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [selectedServiceId, setSelectedServiceId] = useState<number>(1);

  const apiDetails = {
    url: GetParcelsChart,
    method: HttpMethod.GET,
  };

  const { data: chartData, isLoading, isError } = useReactQuery(apiDetails);

  interface ServiceTypeOption {
    id: number;
    name: string;
  }

  const serviceTypeOptions: ServiceTypeOption[] = [
    { id: 1, name: "بافر" },
    { id: 2, name: "بافرحمل" },
    { id: 5, name: "اکسپرس" },
  ];

  const currentService = chartData?.data?.objectResult?.find(
    (item: any) => item.serviceTypeId === selectedServiceId
  );

  const parcelAccepted = currentService?.charts?.[0]?.parcelAcceptedCount || 0;
  const pendingDelivery =
    currentService?.charts?.[0]?.pendingDeliveryCount || 0;
  const max = parcelAccepted + pendingDelivery;
  useEffect(() => {
    let start = 0;
    const duration = 1000;
    const steps = 60;
    const stepValue = parcelAccepted / steps;

    const timer = setInterval(() => {
      start += stepValue;
      if (start >= parcelAccepted) {
        clearInterval(timer);
        setAnimatedValue(parcelAccepted);
      } else {
        setAnimatedValue(Math.round(start));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [parcelAccepted]);

  const percentage = max > 0 ? Math.round((parcelAccepted / max) * 100) : 0;

  const getColor = () => {
    if (percentage < 30) return "#10B981";
    if (percentage < 70) return "#3B82F6";
    return "#EF4444";
  };

  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-48";
      case "lg":
        return "h-80";
      case "xl":
        return "h-96";
      default:
        return "h-64";
    }
  };

  const getTextSizeClass = () => {
    switch (size) {
      case "sm":
        return "text-xl";
      case "lg":
        return "text-3xl";
      case "xl":
        return "text-4xl";
      default:
        return "text-2xl";
    }
  };

  const chartValues = [
    { name: "Progress", value: animatedValue, fill: getColor() },
    { name: "Background", value: max, fill: "#E5E7EB", radius: [95, 85] },
  ];

  return (
    <div className="rounded-xl shadow-md p-4 transition-all duration-300 hover:shadow-lg">
      {/* انتخاب سرویس */}
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

      {/* Loading & Error */}
      {isLoading && (
        <div className="flex items-center justify-center h-64 text-gray-500">
          در حال بارگذاری...
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center h-64 text-red-500">
          خطا در دریافت داده‌ها
        </div>
      )}

      {/* Gauge Chart */}
      {!isLoading && !isError && (
        <div
          className={`w-full ${getSizeClass()} flex flex-col items-center justify-center`}
        >
          <div className="relative w-full h-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="75%"
                outerRadius="100%"
                barSize={20}
                data={chartValues}
                startAngle={90}
                endAngle={-270}
              >
                <PolarAngleAxis type="number" domain={[0, max]} tick={false} />
                <RadialBar
                  dataKey="value"
                  cornerRadius={10}
                  fill={getColor()}
                  background={{ fill: "#F3F4F6" }}
                  isAnimationActive={true}
                />
                <Tooltip
                  formatter={(value) => [`${value}`, "مرسوله"]}
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>

            {/* متن وسط */}
            <div className="absolute text-center">
              <p
                className={`${getTextSizeClass()} font-bold text-gray-800 transition-all duration-500`}
              >
                {animatedValue}
              </p>
            </div>
          </div>

          {/* توضیحات زیر */}
          <div className="mt-4 flex flex-col sm:flex-row gap-4 justify-center w-full text-center">
            <p className="font-semibold text-gray-800">
              {parcelAccepted} مرسوله آماده تحویل
            </p>
            <p className="font-semibold text-gray-800">
              {pendingDelivery} مرسوله باقی مانده
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GaugeChart;
