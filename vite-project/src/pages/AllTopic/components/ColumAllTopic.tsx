import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const dataTopic = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
  },
  {
    title: "Tên đề tài",
    dataIndex: "nameTopic",
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
    title: "Họ và tên giảng viên hướng dẫn",
    dataIndex: ["teacher", "name"],
  },

  {
    title: "Điểm giáo viên hướng dẫn",
    dataIndex: "instructor",
    align: "center",
    width: "10%",
  },
  {
    title: "Điểm giáo viên phản biện",
    dataIndex: "reviewer",
    align: "center",
    width: "10%",
  },
  {
    title: "Điểm thành viên hội đồng thứ nhất",
    dataIndex: "boardMembers1",
    align: "center",
    width: "10%",
  },
  {
    title: "Điểm thành viên hội đồng thứ hai",
    dataIndex: "boardMembers2",
    align: "center",
    width: "10%",
  },
  {
    title: "Điểm thành viên hội đồng thứ ba",
    dataIndex: "boardMembers3",
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
