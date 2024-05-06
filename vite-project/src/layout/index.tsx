import {
  ActionType,
  ProConfigProvider,
  ProDescriptions,
  ProForm,
  ProFormText,
  ProLayout,
} from "@ant-design/pro-components";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import MenuFooter from "../components/MenuFooter";
import { layoutConfig } from "../config/layout";
import { defaultRouter, workplace } from "../config/route";
import ProfileAccount from "../pages/ProfileUser/ProfileAccount";
import { useContext, useEffect, useRef, useState } from "react";
import { MasterDataFilterApi, UserProfile } from "../service/api";
import { AppContext } from "../context/AppProvider";
import { Button, Col, Drawer, Modal, Row } from "antd";
import { EditOutlined } from "@ant-design/icons";
import FormProfile from "../pages/ProfileUser/FormProfile";
import { UserType } from "../service/types";

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const getMasterData = async () => {
      const res = await MasterDataFilterApi("role");
      // console.log("res:: ", res);
      dispatch({
        payload: {
          listRole: res,
        },
        type: "setListRole",
      });
    };

    getMasterData();
  }, []);

  const goTo = (pathName: string) => {
    const pathRouter = defaultRouter?.[pathName] || pathName;
    navigate(pathRouter);
  };

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState<UserType>();
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const actionRef = useRef<ActionType>();

  const onClose = () => {
    dispatch({
      payload: {
        isDrawerProfile: false,
      },
      type: "setIsDrawerProfile",
    });
  };

  const onClose2 = () => {
    dispatch({
      payload: {
        isModalPassword: false,
      },
      type: "setIsDrawerProfile",
    });
  };

  // const handleCancel = () => {
  //   state.isModalPassword(false);
  // };

  const onClose1 = () => {
    setIsDetailVisible(false);
  };

  const handleUpdate = (data) => {
    console.log("Dữ liệu cũ:", data);
    setIsDetailVisible(true);
    setEditingId(data.id);
    // onClose();  // muốn đóng draw cũ trước khi update
    setOpen(false);
    setData(data);
  };

  const handleFinish = useEffect(() => {
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
    <ProConfigProvider hashed={false}>
      <ProLayout
        {...layoutConfig}
        title=""
        route={{
          routes: workplace.children,
        }}
        location={{
          pathname,
        }}
        avatarProps={{
          render(props, defaultDom) {
            return <ProfileAccount defaultDom={defaultDom} />;
          },
          size: "large",
          src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
        }}
        menuFooterRender={(props) => {
          if (props?.collapsed) return undefined;
          return <MenuFooter />;
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        menuItemRender={(item, dom) => (
          <div
            onClick={() => {
              goTo(item.path || "/");
            }}
          >
            {dom}
          </div>
        )}
      >
        <Outlet />
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
            {data && data.role === "STUDENT" && (
              <ProDescriptions.Item
                dataIndex="className"
                label="Lớp"
                span={3}
              />
            )}
            <ProDescriptions.Item
              dataIndex="phone"
              label="Số điện thoại"
              span={3}
            />
            <ProDescriptions.Item dataIndex="email" label="Email" span={3} />
            <ProDescriptions.Item
              dataIndex="address"
              label="Địa chỉ"
              span={3}
            />
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
                actionRef={() => actionRef.current?.reload}
              />
            </Drawer>
          </ProDescriptions>
        </Drawer>
        <Modal
          width={400}
          destroyOnClose
          title="Đổi mật khẩu"
          open={state.isModalPassword}
          // onCancel={handleCancel}
          footer={false}
        >
          <ProForm
            submitter={{
              resetButtonProps: false,
              searchConfig: {
                submitText: "Xác nhận",
              },
              render({ form }, dom) {
                return (
                  <div className="submitFootbar">
                    <Button
                      // danger
                      onClick={onClose2}
                    >
                      Đóng
                    </Button>
                    {dom}
                  </div>
                );
              },
            }}
            layout="vertical"
          >
            <Row gutter={24}>
              <Col span={24}>
                <ProFormText
                  name="oldPassword"
                  label="Mật khẩu hiện tại"
                  placeholder="Nhập mật khẩu..."
                />
              </Col>
              <Col span={24}>
                <ProFormText
                  name="newPassword"
                  label="Mật khẩu mới"
                  placeholder="Nhập mật khẩu ..."
                />
              </Col>
              <Col span={24}>
                <ProFormText
                  name="confirmNewPassword"
                  label="Nhập lại mật khẩu mới"
                  placeholder="Nhập mật khẩu..."
                />
              </Col>
            </Row>
          </ProForm>
        </Modal>
      </ProLayout>
    </ProConfigProvider>
  );
};

export default Layout;
