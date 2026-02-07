export const BaseUrl = process.env.REACT_APP_API_BASE_URL;

export const StorageBaseUrl = process.env.REACT_APP_STORAGE_BASE_URL;

export const LoginRequest = `${BaseUrl}/v1/Users/Login`;
export const GetUserInfo = `${BaseUrl}/v1/Users/GetUserInfo`;
export const VerifyOTP = `${BaseUrl}/v1/Users/VerifyOTP`;
export const GetBundles = `${BaseUrl}/v1/FleetApp/GetBundles`;
export const GetMissions = `${BaseUrl}/v1/FleetApp/GetMissions`;
export const StepDone = `${BaseUrl}/v1/FleetApp/StepDone`;
export const GetBundleByParcel = `${BaseUrl}/v1/FleetApp/FindBundleByParcel`;
export const GetParcelByBundle = `${BaseUrl}/v1/FleetApp/GetParcelsByBundle`;
export const DeliveryParcel = `${BaseUrl}/v1/FleetApp/DeliveryParcel`;
export const ScanBarcode = `${BaseUrl}/v1/FleetApp/ScanBarcode`;
export const SharedFleetAcceptBundle = `${BaseUrl}/v1/FleetApp/SharedFleetAcceptBundle`;
export const GetFleetMissions = `${BaseUrl}/v1/FleetApp/GetFleetMissions`;
export const GetFleetTransactions = `${BaseUrl}/v1/FleetApp/GetFleetTransactions`;
export const GetJobs = `${BaseUrl}/v1/Jobs/GetJobs`;
export const ScanAcceptance = `${BaseUrl}/v1/Jobs/ScanAcceptance`;
export const ScanDelivery = `${BaseUrl}/v1/Jobs/ScanDelivery`;
export const GetBundleParcels = `${BaseUrl}/v1/Bundles/GetBundleParcels`;
export const SameDayGetParcel = `${BaseUrl}/v1/Parcels/GetParcelsForDelivery`;
export const ConfirmParcelsDelivery = `${BaseUrl}/v1/Jobs/ConfirmParcelsDelivery`;
export const GetExpiredBundles = `${BaseUrl}/v1/Dashboard/GetExpiredBundles`;
export const GetTimeWindowsChart = `${BaseUrl}/v1/Dashboard/GetTimeWindowsChart`;
export const GetParcelsChart = `${BaseUrl}/v1/Dashboard/GetParcelsChart`;
export const GetDashboardCounts = `${BaseUrl}/v1/Dashboard/GetDashboardCounts`;
export const GetCustomerDropDown = `${BaseUrl}/v1/Customers/GetCustomersDropDown`;
export const SearchParcel = (barcode?: string) => {
  const query = barcode ? `?barcode=${encodeURIComponent(barcode)}` : "";
  return `${BaseUrl}/v1/Parcels/SearchParcel${query}`;
};
export const CreateOvernightBufferBySupervisor = `${BaseUrl}/v1/Orders/CreateOvernightBufferBySupervisor`;
export const GetByBarcode = `${BaseUrl}/v1/DamageReports/GetByBarcode`;
export const CreateDamageReports = `${BaseUrl}/v1/DamageReports/Create`;
export const GetDamageParcelTypes = `${BaseUrl}/v1/DamageReports/GetDamageParcelTypes`;
export const DeliverParcelByPOD = `${BaseUrl}/v1/Jobs/DeliverParcelByPOD`;