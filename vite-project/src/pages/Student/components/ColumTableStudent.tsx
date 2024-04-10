import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import { UserType } from "../../../service/types";
import { ProColumns } from "@ant-design/pro-components";
import { handleFilterMasterData } from "../../../service/utils";
import moment from "moment";

interface ColumnProps {
  handleViewDetail: (record: UserType) => void;
  handleEdit: (record: UserType) => void;
  handleDelete: (record: UserType) => void;
}

export const columStudent = ({
  handleViewDetail,
  handleEdit,
  handleDelete,
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
      title: "Mã sinh viên",
      dataIndex: "userCode",
    },
    {
      title: "Lớp",
      dataIndex: "className",
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
      hideInSearch: true, //ẩn ở tìm kiếm
      width: "100px",
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
      width: "100px",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      hideInSearch: true,
      hideInTable: true,
      width: "100px",
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
          ></Button>
          <Button
            type="link"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          ></Button>
        </Space>
      ),
    },
  ];
};
