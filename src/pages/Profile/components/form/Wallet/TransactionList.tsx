import React from 'react';
import { HttpMethod } from '../../../../../models/enums/HttpMethod';
import TransactionCard from './TransactionCard';
import { useReactQuery } from '../../../../../components/hooks/query/useReactQuery';
import { GetFleetTransactions } from '../../../../../setting/ApiUrl';
import Loading from '../../../../../components/tools/loading/Loading';

function TransactionList() {
    const { data,isLoading } = useReactQuery({
        method: HttpMethod.GET,
        url: GetFleetTransactions,
    });
  return (
    <div className="h-full w-full flex justify-center">
      <div className="w-full max-w-md  h-[450px] overflow-y-auto">
        {
          isLoading ? (
            <div className="w-full h-full flex justify-center items-center">
              <Loading />
            </div>
          ) : (
            data?.data?.map((item: any) => (
              <TransactionCard key={item.id} data={item} />
            ))
          )
        }
      </div>
    </div>
  );
}

export default TransactionList
