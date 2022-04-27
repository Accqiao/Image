import type { ProColumns } from '@ant-design/pro-table';
import { Avatar, Button, message, Popconfirm, Tag } from 'antd';
import React from 'react';
import {
  EyeOutlined,
  FireOutlined,
  HeartOutlined,
  PlusCircleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { UPDATE_Image } from '@/services/ManageImageRequest';
import ImageCard from '@/pages/Manage/Images/ImageCard';
import UserCard from '@/pages/Manage/Users/UserCard';

export const buildColumnsForUser = (
  handleRefresh: () => void,
): ProColumns[] => {
  return [
    {
      title: '头像',
      dataIndex: 'head',
      render: (_, record) => {
        return (
          <Avatar
            size={'large'}
            src={'http://localhost:8088/image/' + record.head}
          />
        );
      },
    },
    {
      title: '用户名',
      dataIndex: 'uid',
      ellipsis: true,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: '性别',
      dataIndex: 'gender',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '简介',
      dataIndex: 'introduction',
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (_, record) => {
        const color = {
          admin: 'red',
          user: 'green',
        };
        //@ts-ignore
        return (
          <Tag color={color[record.role]}>
            {record.role == 'admin' ? '管理员' : '用户'}
          </Tag>
        );
      },
    },

    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      width: 140,
      render: (_, record) => {
        return (
          <>
            <UserCard handleRefresh={handleRefresh} userInfo={record} />
          </>
        );
      },
    },
  ];
};

export const buildColumnsForImage = (
  handleRefresh: () => void,
): ProColumns[] => {
  const UpdateState = async (hid: string, state: string) => {
    const newState = state == 'yes' ? 'no' : 'yes';
    const res = await UPDATE_Image({ hid: hid, state: newState });
    if (res.data && res.data.result) {
      handleRefresh();
      message.success('操作完成！');
    } else {
      message.error('操作失败！');
    }
  };
  return [
    {
      title: '图片',
      dataIndex: 'href',
      render: (_, record) => {
        return <ImageCard image={record} handleRefresh={handleRefresh} />;
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
      ellipsis: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
    },
    {
      title: '尺寸',
      dataIndex: 'size',
      render: (_, record) => <>{record.width + 'X' + record.height}</>,
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (_, record) => {
        const color = {
          shape: '',
          PC: 'blue',
          Phone: 'orange',
          // "高": "red",
        };
        return (
          //@ts-ignore
          <Tag color={color[record.type]} key={record.type}>
            {record.type}
          </Tag>
        );
      },
    },
    {
      title: '浏览量',
      dataIndex: 'trailnum',
      render: (_, record) => {
        return (
          <>
            <EyeOutlined style={{ color: 'blue', marginRight: 10 }} />
            {record.trailnum}
          </>
        );
      },
    },
    {
      title: '收藏量',
      dataIndex: 'likenum',
      render: (_, record) => {
        return (
          <>
            <HeartOutlined style={{ color: 'red', marginRight: 10 }} />
            {record.trailnum}
          </>
        );
      },
    },
    {
      title: '流行度',
      dataIndex: 'score',
      render: (_, record) => {
        return (
          <>
            <FireOutlined style={{ color: 'red', marginRight: 10 }} />
            {record.trailnum}
          </>
        );
      },
    },
    {
      title: '状态',
      dataIndex: 'state',
    },
    {
      title: '操作',
      hideInSearch: true,
      fixed: 'right',
      render: (_, record) => {
        return (
          <span>
            <Popconfirm
              title="确定该操作 ?"
              onConfirm={() => UpdateState(record.hid, record.state)}
              okText="确定"
              cancelText="取消"
            >
              <Button type={'link'} danger={record.state == 'yes'}>
                {record.state == 'yes' ? '禁止' : '解禁'}
              </Button>
            </Popconfirm>
          </span>
        );
      },
    },
  ];
};
