import { useEffect, useState } from "react";
import { getUserDetail } from "../../../service/api";
import { Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";

interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}

const DrawerUser: React.FC<DrawerProps> = ({ open, onClose }) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const response = await getUserDetail(1);
        setUserData(response);
      } catch (error) {
        console.error("Error fetching topic detail:", error);
      }
    };

    fetchUserDetail();
  }, []);
  return (
    <Drawer
      title="Thông tin người dùng"
      onClose={() => onClose(false)}
      visible={open}
      width={"50%"}
    >
      <ProDescriptions
        dataSource={userData}
        // column={1}
        columns={[
          {
            title: "Họ và tên",
            key: "name",
            dataIndex: "name",
            ellipsis: true,
          },
          {
            title: "Tên đăng nhập",
            key: "username",
            dataIndex: "username",
            ellipsis: true,
          },
          {
            title: "Vai trò",
            key: "role",
            dataIndex: "role",
            ellipsis: true,
          },
          {
            title: "Email",
            key: "email",
            dataIndex: "email",
            ellipsis: true,
          },
          {
            title: "Mã user",
            key: "userCode",
            dataIndex: "userCode",
            ellipsis: true,
          },
          {
            title: "Lớp",
            key: "className",
            dataIndex: "className",
            ellipsis: true,
          },
          {
            title: "Thuộc bộ môn",
            key: "subject",
            dataIndex: "subject",
            ellipsis: true,
          },
          {
            title: "Số điện thoại",
            key: "phone",
            dataIndex: "phone",
            ellipsis: true,
          },
          {
            title: "Ngày sinh",
            key: "dob",
            dataIndex: "dob",
            ellipsis: true,
          },
          {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
            ellipsis: true,
          },
        ]}
      ></ProDescriptions>
    </Drawer>
  );
};
export default DrawerUser;
