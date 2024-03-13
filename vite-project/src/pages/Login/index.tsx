import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Col, Row, Tabs } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";

const Login: React.FC = () => {
  return (
    <ProConfigProvider hashed={false}>
      <Row style={{ backgroundColor: "#f4f4f4" }}>
        <Col xs={0} lg={18} xl={18} md={18}>
          <div
            style={{
              backgroundImage: "url(/images/trangchuu.webp)",
              // backgroundColor: "#62d6c9",
              height: "100vh",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </Col>
        <Col xs={24} lg={6} xl={6} md={6}>
          <LoginForm subTitle="Hệ thống quản lý Khóa Luận Tốt Nghiệp">
            <Tabs centered>
              <Tabs.TabPane tab={"Đăng nhập tài khoản"} />
            </Tabs>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Tài khoản:"}
              rules={[
                {
                  required: true,
                  message: "Trường thông tin bắt buộc!",
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"Mật khẩu:"}
              rules={[
                {
                  required: true,
                  message: "Trường thông tin bắt buộc!",
                },
              ]}
            />
          </LoginForm>
        </Col>
      </Row>
    </ProConfigProvider>
  );
};

export default Login;
