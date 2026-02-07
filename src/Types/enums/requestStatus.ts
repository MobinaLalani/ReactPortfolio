export type RequestStatusValue =
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15;

export interface RequestStatusConfig {
  value: RequestStatusValue;
  type:string ,
  label: string;
  color: {
    text: string;
    bg: string;
    border: string;
  };
}

/**
 * آرایه اصلی وضعیت‌ها
 */
export const REQUEST_STATUS_CONFIG: readonly RequestStatusConfig[] = [
  {
    value: 0,
    type: "success",
    label: "عملیات با موفقیت انجام شد",
    color: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-300",
    },
  },
  {
    value: 1,
    type: "Failed",
    label: "عملیات ناموفق بود",
    color: { text: "text-red-600", bg: "bg-red-50", border: "border-red-300" },
  },
  {
    value: 2,
    type: "Failed",
    label: "احراز هویت ناموفق",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 3,
    type: "warnning",
    label: "رکورد از قبل وجود دارد",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 4,
    type: "Failed",
    label: "یافت نشد",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 5,
    type: "Failed",
    label: "رکورد در حال استفاده است",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 6,
    type: "warning",
    label: "رکورد تکراری است",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 7,
    type: "Failed",
    label: "خطای اعتبارسنجی اطلاعات",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 8,
    type: "Failed",
    label: "تداخل همزمانی (Concurrency)",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 9,
    type: "Failed",
    label: "توکن منقضی شده است",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 10,
    type: "Failed",
    label: "کاربر نادرست است",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 11,
    type: "Failed",
    label: "توکن نامعتبر است",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 12,
    type: "Failed",
    label: "نیازی به رفرش نیست",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 13,
    type: "Failed",
    label: "مرسوله قبلاً توسط ناوگان دریافت شده",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 14,
    type: "Failed",
    label: "حساب کاربری تأیید شد",
    color: {
      text: "text-gray-600",
      bg: "bg-gray-50",
      border: "border-gray-200",
    },
  },
  {
    value: 15,
    label: "هشدار",
    type: "warning",
    color: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-300",
    },
  },
] as const;

/**
 * Map سریع برای دسترسی O(1) بر اساس value
 */
export const REQUEST_STATUS_MAP: Record<
  RequestStatusValue,
  RequestStatusConfig
> = REQUEST_STATUS_CONFIG.reduce((acc, item) => {
  acc[item.value] = item;
  return acc;
}, {} as Record<RequestStatusValue, RequestStatusConfig>);
