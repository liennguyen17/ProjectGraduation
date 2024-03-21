import {
  LoginForm,
  ProConfigProvider,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, Row, Tabs, Typography, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./styles.css";
import { useState } from "react";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { LoginApi } from "../../service/api";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { Link } = Typography;
  const [forgotPasswordModalVisible, setForgotPasswordModalVisible] =
    useState(false);

  const handleForgotPassword = () => {
    setForgotPasswordModalVisible(true);
  };

  const handleCancelForgotPassword = () => {
    setForgotPasswordModalVisible(false);
  };

  const handleLogin = async (values: any) => {
    const { username, password } = values;
    try {
      const responseData = await LoginApi(username, password);
      console.log("Login response", responseData);
      if (responseData.success) {
        message.success("Đăng nhập thành công.");
        navigate("/users");
      } else {
        if (responseData.error && responseData.error.errors) {
          responseData.error.errors.forEach((error: any) => {
            message.error(error.message);
          });
        } else if (responseData.error && responseData.error.message) {
          message.error(responseData.error.message);
        } else {
          message.error("Đăng nhập thất bại. Vui lòng thử lại sau.");
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      message.error(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu."
      );
    }
  };
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
          <LoginForm
            subTitle="Hệ thống quản lý Khóa Luận Tốt Nghiệp"
            logo="/images/logo-fita.png"
            onFinish={handleLogin}
          >
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
            {/* <Button style={{ float: "right" }} type="link">
              Quên mật khẩu
            </Button> */}
            {/* <a style={{ float: "right" }}>Quên mật khẩu</a> */}
            <Link
              style={{ float: "right", marginBottom: "10px" }}
              onClick={handleForgotPassword}
            >
              Quên mật khẩu
            </Link>
          </LoginForm>
        </Col>
      </Row>
      <ForgotPasswordModal
        visible={forgotPasswordModalVisible}
        onCancel={handleCancelForgotPassword}
      />
    </ProConfigProvider>
  );
};

export default Login;
