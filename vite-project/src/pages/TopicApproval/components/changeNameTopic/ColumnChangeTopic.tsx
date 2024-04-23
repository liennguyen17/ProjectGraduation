import { Button, Space } from "antd";
import { EyeOutlined, EditOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { ChangeTopicType } from "../../../../service/types";
import { handleFilterMasterData } from "../../../../service/utils";

interface ColumnProps {
  // handleViewDetail: (record: TopicType) => void;
  // handleDelete: (record: NewsType) => void;
  handleEditApproval: (record: ChangeTopicType) => void;
  // handleEdit: (record: TopicType) => void;
}

export const topicApprovalChangeName = ({
  // handleViewDetail,
  // handleEdit,
  handleEditApproval,
}: ColumnProps): ProColumns<ChangeTopicType>[] => {
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
      request: () => handleFilterMasterData("changeTopicName"),
    },
    {
      title: "Họ tên sinh viên",
      dataIndex: ["topic", "student", "name"],
    },
    {
      title: "Mã sinh viên",
      dataIndex: ["topic", "student", "userCode"],
      // hideInSearch: true,
    },
    {
      title: "Lớp",
      dataIndex: ["topic", "student", "className"],
      hideInSearch: true,
    },
    {
      title: "Học kỳ",
      dataIndex: ["topic", "semester"],
      valueType: "select",
      request: () => handleFilterMasterData("semester"),
      hideInSearch: true,
    },
    {
      title: "Đề tài mới",
      dataIndex: "newNameTopic",
    },
    {
      title: "Đề tài cũ",
      dataIndex: "oldNameTopic",
      hideInSearch: true,
    },
    {
      title: "Họ và tên giảng viên hướng dẫn",
      dataIndex: ["topic", "teacher", "name"],
      hideInSearch: true,
    },
    {
      title: "Bộ môn quản lý",
      dataIndex: ["topic", "departmentManagement"],
      valueType: "select",
      request: () => handleFilterMasterData("subject"),
      hideInSearch: true,
    },

    {
      title: "Ngày tạo",
      dataIndex: "createAt",
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
          {/* <Button
              // ghost
              type="link"
              // type="primary"
              icon={<EyeOutlined />}
              onClick={() => handleViewDetail(record)}
            ></Button> */}
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
