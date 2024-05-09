import { useEffect, useState } from "react";
import { getUserDetail } from "../../../service/api";
import { Drawer } from "antd";
import { ProDescriptions } from "@ant-design/pro-components";
import { UserType } from "../../../service/types";

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
  const [userData, setUserData] = useState<UserType | null>(null);
  useEffect(() => {
    if (selectedRecord) {
      const fetchUserDetail = async () => {
        try {
          console.log("id user:: ", selectedRecord.id);
          const response = await getUserDetail(selectedRecord.id);
          console.log("response:: ", response);
          // if(response)
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
        //ma oi dung nay thi ko dc
        // request={async () => {
        //   console.log("data:: ", userData);
        //   return Promise.resolve({
        //     success: true,
        //     data: userData,
        //   });
        // }}
        dataSource={userData}
        column={2}
      >
        <ProDescriptions.Item
          dataIndex="name"
          label="Họ và tên"
          // span={3}
        />
        <ProDescriptions.Item
          dataIndex="username"
          label="Tên đăng nhập"
          // span={3}
        />
        <ProDescriptions.Item
          dataIndex="userCode"
          label="Mã người dùng"
          // span={3}
        />
        <ProDescriptions.Item
          dataIndex="dob"
          label="Ngày sinh"
          //  span={3}
        />

        {!userData ||
          (userData.role === "STUDENT" && (
            <ProDescriptions.Item
              dataIndex="className"
              label="Lớp"

              // span={3}
            />
          ))}
        <ProDescriptions.Item
          dataIndex="phone"
          label="Số điện thoại"
          // span={3}
        />
        <ProDescriptions.Item
          dataIndex="email"
          label="Email"
          //  span={3}
        />
        <ProDescriptions.Item
          dataIndex="address"
          label="Địa chỉ"
          // span={3}
        />
        <ProDescriptions.Item
          dataIndex="role"
          label="Vai trò"
          // span={3}
        />
        <ProDescriptions.Item dataIndex="subject" label="Bộ môn" span={3} />
      </ProDescriptions>
    </Drawer>
  );
};
export default DrawerUser;
