import {
  EditOutlined,
  DeleteOutlined,
  SolutionOutlined,
} from "@ant-design/icons";

export const columUser = () => {
  return [
    {
      title: "Họ và tên",
      dataIndex: "name",
      // hideInTable: true,
      hideInSearch: true,
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
      title: "Bộ môn",
      dataIndex: "subject",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      hideInSearch: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
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
