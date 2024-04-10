import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";
import { UserType } from "../../../service/types";
import moment from "moment";
import { handleFilterMasterData } from "../../../service/utils";

interface ColumnProps {
  handleViewDetail: (record: UserType) => void;
  handleEdit: (record: UserType) => void;
  handleDelete: (record: UserType) => void;
  listRole: any[];
}

export const columUser = ({
  handleViewDetail,
  handleEdit,
  handleDelete,
  listRole,
}: ColumnProps): ProColumns<UserType>[] => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      // hideInTable: true,
      // hideInSearch: true,
    },
    {
      title: "Tên đăng nhập",
      dataIndex: "username",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Bộ môn",
      dataIndex: "subject",
      valueType: "select",
      request: () => handleFilterMasterData("subject"),
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      valueType: "select",
      request: () => handleFilterMasterData("role"),
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      hideInSearch: true,
      render: (_, record) => moment(record.dob).format("DD/MM/YYYY"),
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      hideInTable: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: "Hành động",
      hideInSearch: true,
      align: "center",
      render: (_, record) => (
        <Space>
          <Button
            ghost
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          ></Button>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
            disabled={record.role === "ADMIN"}
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
            disabled={record.role === "ADMIN"}
          ></Button>
        </Space>
      ),
    },
  ];
};
