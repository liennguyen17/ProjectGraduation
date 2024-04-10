import { useEffect, useState } from "react";
import { getUserDetail } from "../../../service/api";
import { Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { UserType } from "../../../service/types";
import moment from "moment";

interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRecord: UserType | null;
}

const DrawerUser: React.FC<DrawerProps> = ({
  open,
  onClose,
  selectedRecord,
}) => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    if (selectedRecord) {
      const fetchUserDetail = async () => {
        try {
          const response = await getUserDetail(selectedRecord.id);
          setUserData(response);
        } catch (error) {
          console.error("Error fetching topic detail:", error);
        }
      };

      fetchUserDetail();
    }
  }, [selectedRecord]);
  return (
    <Drawer
      title="Thông tin người dùng"
      onClose={() => onClose(false)}
      visible={open}
      width={"40%"}
    >
      <ProDescriptions
        dataSource={userData}
        // layout="vertical"
        column={2}
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
            render: (_, record) => moment(record.dob).format("DD/MM/YYYY"),
          },
          {
            title: "Địa chỉ",
            key: "address",
            dataIndex: "address",
            ellipsis: true,
          },
          {
            title: "Ngày tạo",
            key: "createAt",
            dataIndex: "updateAt",
            ellipsis: true,
          },
          {
            title: "Ngày cập nhật",
            key: "updateAt",
            dataIndex: "updateAt",
            ellipsis: true,
          },
        ]}
      ></ProDescriptions>
    </Drawer>
  );
};
export default DrawerUser;
