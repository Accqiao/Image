import { useCallback } from 'react';

export function ProTableRequest(
  getModel: (ReParams: any) => Promise<any>,
  limitParams?: any,
) {
  const tableData = useCallback(
    async (params: any) => {
      const { current, pageSize, ...rest } = params;
      console.log('pro', {
        ...rest,
        page: current,
        rows: pageSize || 10,
        ...limitParams,
      });
      const res = await getModel({
        ...rest,
        page: current,
        rows: pageSize || 10,
        ...limitParams,
      });
      console.log('proBack', res);
      return {
        data: res && res.data && res.data.value ? res.data.value : [],
        total: res && res.data && res.data.count ? res.data.count : 0,
        success: res && res.result,
      };
    },
    [limitParams, getModel],
  );

  return tableData;
}
