export interface MenuItem {
  label: string;
  url: string;
  orderType?:number;
  icon?: any;
}

export const menuItems: MenuItem[] = [
  {
    label: "گزارش آسیب‌دیدگی",
    url: "/DeclarationDamage",
  },
  {
    label: "ثبت سفارش بافر",
    url: "/Order/createOrder",
    orderType: 2,
  },
  {
    label: "ثبت سفارش  بافرشبانه",
    url: "/Order/createOrder",
    orderType: 7,
  },

  {
    label: "گزارشات",
    url: "/Reports",
  },
  {
    label: "تنظیمات",
    url: "/Settings",
  },
  {
    label:'تحویل با کد',
    url :'/DeliverParcelWithPOD'
  }
];
