import React, { useCallback, useRef } from 'react';
import ProTable, { ActionType } from '@ant-design/pro-table';
import { ProTableRequest } from '@/pages/Manage/tables/tableRequest';
import { buildColumnsForImage } from '@/pages/Manage/tables/tablesColumns';
import { GET_UserByPage } from '@/services/ManageUsersRequest';
import { GET_ImageByPage } from '@/services/ManageImageRequest';

export default () => {
  const tableRef = useRef<ActionType>();
  const tableRequest = ProTableRequest(GET_ImageByPage);
  const handleRefresh = useCallback(() => {
    tableRef.current?.reload();
  }, []);

  return (
    <div>
      <ProTable
        // className={}
        actionRef={tableRef}
        rowKey={'id'}
        columns={buildColumnsForImage(handleRefresh)}
        scroll={{ x: true }}
        tableLayout="auto"
        params={{}}
        request={tableRequest}
        search={false}
        pagination={{
          showSizeChanger: true,
          pageSize: 5,
        }}
        headerTitle="图片管理"
      />
    </div>
  );
};
