import {
  EditOutlined,
  DeleteOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

export const colums = () => {
  return [
    {
      title: "Tiêu đề",
      dataIndex: "title",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
    },
    {
      title: "File đính kèm",
      dataIndex: "file",
      hideInSearch: true,
    },
    {
      title: "Năm",
      dataIndex: "year",
    },
    {
      title: "Bộ môn",
      dataIndex: "subject",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAt",
      hideInSearch: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updateAt",
      hideInSearch: true,
    },
    {
      title: "Hành động",
      hideInSearch: true,
      //   width: 100,
      render: (_, record) => (
        <div>
          <SolutionOutlined
            style={{ fontSize: "22px", color: "#65ddc7", marginRight: "13px" }}
            //   onClick={() => handleAdd()}
          />
          <EditOutlined
            style={{ fontSize: "22px", color: "#3eb0e8", marginRight: "13px" }}
            // onClick={() => handleEdit(record)}
          />
          <DeleteOutlined
            style={{ fontSize: "22px", color: "#fc755a" }}
            // onClick={() => handleDelete(record)}
          />
        </div>
      ),
    },
  ];
};
