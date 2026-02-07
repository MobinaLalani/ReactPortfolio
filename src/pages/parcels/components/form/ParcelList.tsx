import React, { useMemo } from "react";
import { useReactQuery } from "../../../../components/hooks/query/useReactQuery";
import { GetBundleParcels } from "../../../../setting/ApiUrl";
import BundleCard from "./ParcelCard";
import { HttpMethod } from "../../../../models/enums/HttpMethod";
import {ReactComponent as EmptyParcelIcon} from '../../../../components/icons/svg/emptyIcon.svg'
import { useParams } from "react-router-dom";
import Loading from "../../../../components/tools/loading/Loading";

type BundleListProps = {
  activeButton: string;
};

function BundleList({ activeButton }: BundleListProps) {

  const { bundleId } = useParams();

  const apiDetails = useMemo(
    () => ({
      url: GetBundleParcels,
      method: HttpMethod.POST,
      body: {
        pageNumber: 1,
        pageSize: 100,
        id: bundleId,
      },
    }),
    [bundleId]
  );

  const { data, isLoading, refetch, isError } = useReactQuery(apiDetails);
  const parcels = data?.data?.items?.[0]?.parcels ?? [];
  if (isLoading) return <p><Loading/></p>;
  if (isError) return <p>خطا در دریافت دیتا</p>;

  return (
    <div className="  h-[800px] overflow-y-auto">
      {/* {parcels} */}
      { 
      parcels.lenth ===0 ?  <EmptyParcelIcon/> :
      parcels.map((item: any, index: number) => (
        <BundleCard key={index} {...item} />
      ))}
    </div>
  );
}

export default BundleList;



