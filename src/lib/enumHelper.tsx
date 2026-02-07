// src/utils/enumsHelper.ts
import dropDownEnums from "../Types/enums/dropDowns/DropDownEnums.json";

type EnumKey = keyof typeof dropDownEnums;
type EnumItem = { value: number; label: string };

export function getEnum(key: EnumKey): EnumItem[] {
  return dropDownEnums[key] || [];
}
