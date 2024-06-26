import {
  ActionType,
  PageContainer,
  ProDescriptions,
} from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import { UserProfile } from "../../service/api";
import { EditOutlined } from "@ant-design/icons";
import { UserType } from "../../service/types";
import FormProfile from "./FormProfile";
import { AppContext } from "../../context/AppProvider";

const Info: React.FC = () => {
  const [open, setOpen] = useState(false);
  // const [open1, setOpen1] = useState(false);
  const [data, setData] = useState<UserType>();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const actionRef = useRef<ActionType>();
  const { state, dispatch } = useContext(AppContext);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    dispatch({
      payload: {
        isDrawerProfile: false,
      },
      type: "setIsDrawerProfile",
    });
  };

  const onClose1 = () => {
    setIsDetailVisible(false);
  };

  const handleUpdate = (data) => {
    console.log("Dữ liệu cũ:", data);
    setIsDetailVisible(true);
    setEditingId(data.id);

    setOpen(true);
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
        width={500}
        title="Hồ sơ"
        open={state.isDrawerProfile}
        onClose={onClose}
        footer={
          <div style={{ textAlign: "right" }}>
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Đóng
            </Button>
            <Button style={{ marginRight: 8 }} type="primary">
              File
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
          <Drawer
            onClose={onClose1}
            title="Cập nhật thông tin người dùng"
            open={isDetailVisible}
            width={500}
          >
            <FormProfile
              data={data}
              setData={setData}
              editingId={editingId}
              onClose={onClose1}
              actionRef={actionRef.current?.reload}
            />
          </Drawer>
        </ProDescriptions>
      </Drawer>
    </PageContainer>
  );
};
export default Info;
