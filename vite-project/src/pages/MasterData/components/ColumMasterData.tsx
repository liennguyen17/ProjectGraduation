import { Button, Space } from "antd";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { ProColumns } from "@ant-design/pro-components";

interface MasterData {
  id: number;
  type: string;
  code: string;
  name: string;
}
export const columsMasterData = (): ProColumns<MasterData>[] => {
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
    },
    {
      title: "Thuộc loại",
      dataIndex: "type",
    },
    {
      title: "Tên",
      dataIndex: "name",
      //   hideInTable: true,
    },
    {
      title: "Hành động",
      hideInSearch: true,
      align: "center",
      render: () => (
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
};
