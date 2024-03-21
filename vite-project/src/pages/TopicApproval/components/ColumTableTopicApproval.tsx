import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const dataTopicApproval = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
  },
  {
    title: "Trạng thái",
    dataIndex: "status",
    // width: "10%",
  },
  {
    title: "Họ tên sinh viên",
    dataIndex: ["student", "name"],
  },
  {
    title: "Mã sinh viên",
    dataIndex: ["student", "userCode"],
  },
  {
    title: "Lớp",
    dataIndex: ["student", "className"],
  },
  {
    title: "Số điện thoại",
    dataIndex: ["student", "phone"],
  },
  {
    title: "Email",
    dataIndex: ["student", "email"],
  },
  {
    title: "Tên đề tài",
    dataIndex: "nameTopic",
  },
  {
    title: "Họ và tên giảng viên hướng dẫn",
    dataIndex: ["teacher", "name"],
  },
  {
    title: "Bộ môn quản lý",
    dataIndex: "departmentManagement",
  },
  {
    title: "Tên cơ sở thực tập",
    dataIndex: "nameInternshipFacility",
    // align: "center",
    width: "10%",
  },
  {
    title: "Cán bộ hướng dẫn tại cơ sở thực tập",
    dataIndex: "menterInternshipFacility",
    // align: "center",
    width: "10%",
  },
  {
    title: "Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập",
    dataIndex: "phoneInstructorInternshipFacility",
    align: "center",
    width: "10%",
  },
  {
    title: "Ngày tạo",
    dataIndex: "createAt",
    align: "center",
  },
  {
    title: "Ngày cập nhật",
    dataIndex: "updateAt",
    align: "center",
  },
  {
    title: "Thao tác",
    dataIndex: "operation",
    align: "center",
    hideInSearch: true,
    render: () => (
      <Space>
        <Button
          ghost
          type="link"
          icon={<EyeOutlined />}
          // onClick={() => handleView(record)}
        ></Button>
        <Button
          type="link"
          icon={<EditOutlined />}
          // onClick={() => handleEdit(record)}
        ></Button>
        <Button
          type="link"
          icon={<DeleteOutlined />}
          //onClick={() => handleDelete(record)}
        ></Button>
      </Space>
    ),
  },
];
