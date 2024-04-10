import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";
import { MasterData } from "../../../service/types";

interface ColumnProps {
  handleEdit: (record: MasterData) => void;
  handleDelete: (record: MasterData) => void;
}
export const columsMasterData = ({
  handleEdit,
  handleDelete,
}: ColumnProps): ProColumns<MasterData>[] => {
  return [
    {
      title: "ID",
      dataIndex: "id",
      hideInTable: true,
      hideInSearch: true,
    },
    {
      title: "Mã",
      dataIndex: "code",
      hideInSearch: true,
    },
    {
      title: "Thuộc loại",
      dataIndex: "type",
      hideInSearch: true,
    },
    {
      title: "Tên",
      dataIndex: "name",
      hideInSearch: true,
      //   hideInTable: true,
    },
    {
      title: "Hành động",
      hideInSearch: true,
      align: "center",
      render: (_, record) => {
        // console.log("log:: ", record);
        return (
          <Space>
            {/* <Button
              ghost
              type="link"
              icon={<EyeOutlined />}
              // onClick={() => handleView(record)}
            ></Button> */}
            <Button
              type="link"
              icon={<EditOutlined />}
              disabled={record.code === "ROLE"}
              onClick={() => handleEdit(record)}
            ></Button>
            <Button
              type="link"
              icon={<DeleteOutlined />}
              disabled={record.code === "ROLE"}
              onClick={() => handleDelete(record)}
            ></Button>
          </Space>
        );
      },
    },
  ];
};
