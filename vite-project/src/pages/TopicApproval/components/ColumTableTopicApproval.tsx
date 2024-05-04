import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { TopicType } from "../../../service/types";
import { ProColumns } from "@ant-design/pro-components";
import { handleFilterMasterData } from "../../../service/utils";

interface ColumnProps {
  handleViewDetail: (record: TopicType) => void;
  // handleDelete: (record: NewsType) => void;
  handleEditApproval: (record: TopicType) => void;
  handleEdit: (record: TopicType) => void;
}

export const dataTopicApproval = ({
  handleViewDetail,
  handleEdit,
  handleEditApproval,
}: ColumnProps): ProColumns<TopicType>[] => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      valueType: "select",
      request: () => handleFilterMasterData("status"),
    },
    {
      title: "Họ tên sinh viên",
      dataIndex: ["student", "name"],
    },
    {
      title: "Mã sinh viên",
      dataIndex: ["student", "userCode"],
      hideInSearch: true,
    },
    {
      title: "Lớp",
      dataIndex: ["student", "className"],
      hideInSearch: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: ["student", "phone"],
      hideInSearch: true,
    },
    {
      title: "Email",
      dataIndex: ["student", "email"],
      hideInSearch: true,
    },
    {
      title: "Học kỳ",
      dataIndex: "semester",
      valueType: "select",
      request: () => handleFilterMasterData("semester"),
    },
    {
      title: "Tên đề tài",
      dataIndex: "nameTopic",
    },
    {
      title: "Họ và tên giảng viên hướng dẫn",
      dataIndex: ["teacher", "name"],
      // hideInSearch: true,
    },
    {
      title: "Bộ môn quản lý",
      dataIndex: "departmentManagement",
      valueType: "select",
      request: () => handleFilterMasterData("subject"),
    },
    {
      title: "Tên cơ sở thực tập",
      dataIndex: "nameInternshipFacility",
      // align: "center",
      width: "10%",
      hideInSearch: true,
    },
    {
      title: "Cán bộ hướng dẫn tại cơ sở thực tập",
      dataIndex: "menterInternshipFacility",
      align: "center",
      width: "7%",
      hideInSearch: true,
    },
    {
      title: "Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập",
      dataIndex: "phoneInstructorInternshipFacility",
      align: "center",
      width: "7%",
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
      align: "center",
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Button
            // ghost
            type="link"
            // type="primary"
            icon={<EyeOutlined />}
            onClick={() => handleViewDetail(record)}
          ></Button>
          {/* <Button
            type="link"
            // type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          ></Button> */}
          {/* <Button
            type="link"
            icon={<DeleteOutlined />}
            //onClick={() => handleDelete(record)}
          ></Button> */}
          <Button
            // ghost
            type="primary"
            // icon={<EditOutlined />}
            onClick={() => handleEditApproval(record)}
          >
            Phê duyệt
          </Button>
        </Space>
      ),
    },
  ];
};
