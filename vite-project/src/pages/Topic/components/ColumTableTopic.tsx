import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TopicType } from "../../../service/types";
import { ProColumns } from "@ant-design/pro-components";
import { handleFilterMasterData } from "../../../service/utils";

interface ColumnProps {
  handleViewDetail: (record: TopicType) => void;
  // handleEditApproval: (record: TopicType) => void;
  handleEdit: (record: TopicType) => void;
}

export const dataTopic = ({
  handleViewDetail,
  handleEdit,
}: // handleEditApproval,
ColumnProps): ProColumns<TopicType>[] => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Tên đề tài",
      dataIndex: "nameTopic",
      width: "13%",
    },

    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   // width: "10%",
    // },
    {
      title: "Sinh viên thực hiện",
      dataIndex: ["student", "name"],
    },
    {
      title: "Mã sinh viên",
      dataIndex: ["student", "userCode"],
    },
    {
      title: "Giáo viên hướng dẫn",
      dataIndex: ["teacher", "name"],
    },
    {
      title: "Mã giáo viên hướng dẫn",
      dataIndex: ["teacher", "userCode"],
    },
    {
      title: "Kỳ học",
      dataIndex: "semester",
      // hideInTable: true,
      valueType: "select",
      request: () => handleFilterMasterData("semester"),
    },

    {
      title: "Điểm tại cơ sở thực tập",
      dataIndex: "scoresInternshipFacility",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Điểm giáo viên hướng dẫn",
      dataIndex: "instructor",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Điểm giáo viên phản biện",
      dataIndex: "reviewer",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Điểm thành viên hội đồng thứ nhất",
      dataIndex: "boardMembers1",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Điểm thành viên hội đồng thứ hai",
      dataIndex: "boardMembers2",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Điểm thành viên hội đồng thứ ba",
      dataIndex: "boardMembers3",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Tổng điểm",
      dataIndex: "result",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Kết quả",
      dataIndex: "success",
      align: "center",
      width: "6%",
      hideInSearch: true,
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      align: "center",
      hideInSearch: true,
    },
    {
      title: "Thao tác",
      dataIndex: "operation",
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
          {/* <Button
            type="link"
            icon={<DeleteOutlined />}
            //onClick={() => handleDelete(record)}
          ></Button> */}
        </Space>
      ),
    },
  ];
};
// export const dataSource = [
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
//   {
//     name_topic: "Xây dựng hệ thống quản ký khóa luận tốt nghiệp",
//     student_id: "Nguyễn Thị Liên",
//     teacher_id: "Trần Vũ Hà",
//     status: "Đã phê duyệt",
//     instructor: 8,
//     reviewer: 9,
//     board_members_1: 9,
//     board_members_2: 9.5,
//     board_members_3: 8,
//     create_at: "22/3/2023",
//     update_at: "22/4/2024",
//   },
// ];
