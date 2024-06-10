import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import { ForgotPassword } from "../../service/api";

interface ForgotPasswordModalProps {
  visible: boolean;
  onCancel: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  // Hàm xử lý khi người dùng gửi thông tin quên mật khẩu
  const handleSendInfo = async (values: any) => {
    const { email } = values;

    try {
      // Gọi API quên mật khẩu với email đã nhập
      // await ForgotPassword(email);
      // // Hiển thị thông báo thành công
      // message.success("Đã gửi thông tin thành công!");
      // // Đóng modal sau khi gửi thông tin thành công
      // onCancel();

      const response = await ForgotPassword(email);
      // console.log(response);
      if (response.success) {
        message.success("Vui lòng check email.");
        onCancel();
      } else {
        message.error(response.error.message);
        // onCancel();
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      message.error("Có lỗi xảy ra khi gửi thông tin. Vui lòng thử lại sau!");
      console.error("Error:", error);
    }
  };
  return (
    <Modal
      title="Quên mật khẩu"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button style={{ marginTop: "10px" }} key="submit" onClick={onCancel}>
          Đóng
        </Button>,
        <Button
          key="submit"
          type="primary"
          htmlType="submit"
          onClick={() => form.submit()}
        >
          Gửi thông tin
        </Button>,
      ]}
    >
      <Form form={form} onFinish={handleSendInfo}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message:
                "Vui lòng nhập email để thực hiện chức năng quên mật khẩu!",
            },
            {
              type: "email",
              message: "Email không hợp lệ!",
            },
          ]}
        >
          <Input placeholder={"Nhập địa chỉ email của bạn"} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ForgotPasswordModal;
