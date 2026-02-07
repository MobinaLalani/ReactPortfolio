import React from "react";

const category = {
  missionStatus: {
    1: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "ثبت ماموریت",
    },
    2: {
      bg: "#FDE8E8",
      border: "#F8B4B4",
      textColor: "#C81E1E",
      text: "در حال انجام",
    },
    3: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1A56DB",
      text: "در انتظار",
    },
    4: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "انجام‌ شده",
    },
  },
  orderType: {
    2: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: "بافر",
    },
    1: {
      bg: "#FCE8F3",
      border: "#F8B4D9",
      textColor: "#D61F69",
      text: "بافر حمل",
    },
    5: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1A56DB",
      text: "اکسپرس",
    },
  },
  parcelStatus: {
    1: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1E3A8A",
      text: "ثبت اولیه",
    },
    2: {
      bg: "#FEF3C7",
      border: "#FDE68A",
      textColor: "#92400E",
      text: "در انتظار پذیرش",
    },
    3: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#065F46",
      text: "پذیرش شده",
    },
    4: {
      bg: "#DBEAFE",
      border: "#93C5FD",
      textColor: "#1E40AF",
      text: "آماده تحویل",
    },
    5: {
      bg: "#E0E7FF",
      border: "#A5B4FC",
      textColor: "#3730A3",
      text: "در حال توزیع",
    },
    6: {
      bg: "#DCFCE7",
      border: "#86EFAC",
      textColor: "#166534",
      text: "تحویل نهایی",
    },
    7: {
      bg: "#FEF9C3",
      border: "#FDE68A",
      textColor: "#92400E",
      text: "تاخیر در پذیرش",
    },
    8: {
      bg: "#F3F4F6",
      border: "#D1D5DB",
      textColor: "#374151",
      text: "برگشتی",
    },
    9: {
      bg: "#FEE2E2",
      border: "#FCA5A5",
      textColor: "#991B1B",
      text: "رسوبی",
    },
    10: {
      bg: "#E5E7EB",
      border: "#D1D5DB",
      textColor: "#1F2937",
      text: "مرجوع",
    },
    11: {
      bg: "#F3E8FF",
      border: "#E9D5FF",
      textColor: "#6B21A8",
      text: "بافر موقت",
    },
    12: {
      bg: "#C7D2FE",
      border: "#A5B4FC",
      textColor: "#312E81",
      text: "عودت",
    },
    13: {
      bg: "#FDE8E8",
      border: "#F8B4B4",
      textColor: "#B91C1C",
      text: "لغو شده",
    },
  },

  bundleStatus: {
    1: {
      bg: "#E1EFFE",
      border: "#A4CAFE",
      textColor: "#1A56DB",
      text: "پذیرش مرسولات",
    },
    2: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "در حال باندل بندی",
    },
    3: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "پذیرش باندل",
    },
    4: {
      bg: "#FDE8E8",
      border: "#F8B4B4",
      textColor: "#C81E1E",
      text: "پذیرش شده",
    },
    5: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: "آماده توزیع به لجستیک",
    },
    6: {
      bg: "#F3F4F6",
      border: "#D1D5DB",
      textColor: "#374151",
      text: "در حال توزیع به لجستیک",
    },
    7: {
      bg: "#FEECDC",
      border: "#FDBA8C",
      textColor: "#B43403",
      text: "تحویل نهایی",
    },
    8: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "تاخیر در تحویل",
    },
    11: {
      textColor: "#723B13",
      bg: "#FCE96A",
      border: "#C27803",
      text: "مرجوعی",
    },
  },
  fleetService: {
    1: {
      bg: "#DBEAFE",
      border: "#2563EB",
      textColor: "#1E40AF",
      text: "ناوگان ناحیه‌ای",
    },
    4: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "گردشی",
    },
    2: {
      bg: "#FEF9C3",
      border: "#D97706",
      textColor: "#92400E",
      text: "اشتراکی",
    },
  },
  fleetType: {
    1: {
      bg: "#DBEAFE",
      border: "#2563EB",
      textColor: "#1E40AF",
      text: "تاکسی",
    },
    2: {
      bg: "#FEF9C3",
      border: "#D97706",
      textColor: "#92400E",
      text: "اتوبوس",
    },
  },
  orderStatus: {
    1: {
      bg: "#DBEAFE",
      border: "#2563EB",
      textColor: "#1E40AF",
      text: "ثبت سفارش",
    },
    2: {
      bg: "#FEF9C3",
      border: "#D97706",
      textColor: "#92400E",
      text: "پرداخت نشده",
    },
    3: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "نهایی",
    },
  },
  transactionStatusId: {
    1: {
      bg: "#DEF7EC",
      border: "#84E1BC",
      textColor: "#046C4E",
      text: "موفق",
    },
    2: {
      bg: "#E5EDFF",
      border: "#B4C6FC",
      textColor: "#5145CD",
      text: " ناموفق",
    },
  },
};

type CategoryType = typeof category;
type CategoryName = keyof CategoryType;
type BundleStatusId = keyof typeof category.bundleStatus;
type FleetService = keyof typeof category.fleetService;
type OrderTypeId = keyof typeof category.orderType;

type IdType = BundleStatusId | FleetService | OrderTypeId;

interface TagProps {
  categoryName: CategoryName;
  id: IdType;
  className?: string;
}

const Tag: React.FC<TagProps> = ({ categoryName, id, className = "" }) => {
  // @ts-ignore
  const colors = category[categoryName]?.[id] || {
    bg: "#F3F4F6",
    border: "#D1D5DB",
    textColor: "#374151",
    text: "نامشخص",
  };

  return (
    <div
      className={`${className} h-6 px-3 py-1 rounded-lg justify-center items-center gap-1 inline-flex border`}
      style={{ backgroundColor: colors.bg, borderColor: colors.border }}
    >
      <div
        className="text-right text-xs whitespace-nowrap leading-none"
        style={{ color: colors.textColor }}
      >
        {colors.text}
      </div>
    </div>
  );
};

export default Tag;
