import React, { useCallback, useRef } from 'react';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { ProTableRequest } from '@/pages/Manage/tables/tableRequest';
import { buildColumnsForUser } from '@/pages/Manage/tables/tablesColumns';
import { GET_UserByPage } from '@/services/UserRequest';

export default () => {
  const tableRef = useRef<ActionType>();
  const tableRequest = ProTableRequest(GET_UserByPage);
  const handleRefresh = useCallback(() => {
    tableRef.current?.reload();
  }, []);

  return (
    <div>
      <ProTable
        // className={}
        actionRef={tableRef}
        rowKey={'id'}
        columns={buildColumnsForUser(handleRefresh)}
        scroll={{ x: true }}
        tableLayout="auto"
        params={{}}
        request={tableRequest}
        search={false}
        // toolBarRender={() => {
        //   if(type != 'agree'){
        //     return [<NewUser handleRefresh={handleRefresh} demandId={demandInfo.id} />]
        //   }else return []
        // }}
        headerTitle="用户"
      />
    </div>
  );
};
