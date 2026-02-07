import { RequestStatusValue } from "./enums/requestStatus";
export default interface ScannedItem {

  parcelBarcode?: string;
  bundleBarcode?: string;
  scannedParcelCount?: number;
  totalParcelCount?: number;
  fleetName?: string;
  sort?: number;
  requestStatus: RequestStatusValue;
  message?: string;

}
