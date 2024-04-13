import {
  ActionType,
  PageContainer,
  ProDescriptions,
} from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { useEffect, useRef, useState } from "react";
import { UserProfile } from "../../service/api";
import { EditOutlined } from "@ant-design/icons";
import { UserType } from "../../service/types";
import FormProfile from "./FormProfile";

const Info: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<UserType>();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const actionRef = useRef<ActionType>();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };
  const onClose1 = () => {
    setIsDetailVisible(false);
  };

  const handleUpdate = (data) => {
    console.log("Dữ liệu cũ:", data);
    setIsDetailVisible(true);
    setEditingId(data.id);
    setOpen(false);
    setData(data);
  };

  useEffect(() => {
    const data = async () => {
      try {
        const res = await UserProfile();
        setData(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
  return (
    <PageContainer title="dung giao dien infor user">
      <Button type="primary" onClick={showDrawer}>
        Thông tin người dùng
      </Button>
      <Drawer
        title="Thông tin người dùng"
        open={open}
        onClose={onClose}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Đóng
            </Button>
            <Button
              icon={<EditOutlined />}
              type="primary"
              onClick={() => handleUpdate(data)}
            >
              Cập nhật thông tin
            </Button>
          </div>
        }
      >
        <ProDescriptions
          request={async () => {
            // console.log("data", data);
            return Promise.resolve({
              success: true,
              data: data,
            });
          }}
          actionRef={actionRef}
        >
          <ProDescriptions.Item dataIndex="name" label="Họ và tên" span={3} />
          <ProDescriptions.Item
            dataIndex="username"
            label="Tên đăng nhập"
            span={3}
          />
          <ProDescriptions.Item
            dataIndex="userCode"
            label="Mã người dùng"
            span={3}
          />
          <ProDescriptions.Item dataIndex="dob" label="Ngày sinh" span={3} />
          <ProDescriptions.Item dataIndex="subject" label="Bộ môn" span={3} />
          {!data ||
            (data.role !== "ADMIN" && (
              <ProDescriptions.Item
                dataIndex="className"
                label="Lớp"
                span={3}
              />
            ))}
          <ProDescriptions.Item
            dataIndex="phone"
            label="Số điện thoại"
            span={3}
          />
          <ProDescriptions.Item dataIndex="email" label="Email" span={3} />
          <ProDescriptions.Item dataIndex="address" label="Địa chỉ" span={3} />
          <ProDescriptions.Item dataIndex="role" label="Vai trò" span={3} />
        </ProDescriptions>
      </Drawer>
      <Drawer
        onClose={onClose}
        title="Cập nhật thông tin người dùng"
        open={isDetailVisible}
      >
        <FormProfile
          data={data}
          setData={setData}
          editingId={editingId}
          onClose={onClose1}
        />
      </Drawer>
    </PageContainer>
  );
};
export default Info;
