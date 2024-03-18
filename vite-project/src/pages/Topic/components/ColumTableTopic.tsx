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
    title: "Sinh viên thực hiện",
    dataIndex: ["student", "name"],
  },
  {
    title: "Giáo viên hướng dẫn",
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

export const dataSource = [
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
  {
    name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
    student_id: "Nguyễn Thị Liên",
    teacher_id: "Trần Vũ Hà",
    status: "Đã phê duyệt",
    instructor: 8,
    reviewer: 9,
    board_members_1: 9,
    board_members_2: 9.5,
    board_members_3: 8,
    create_at: "22/3/2023",
    update_at: "22/4/2024",
  },
];
