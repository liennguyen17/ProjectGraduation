import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, FormInstance, Row, message } from "antd";
import { useRef } from "react";
import "../../../index.css";
import { UserType } from "../../../service/types";
import { createUser, editUser } from "../../../service/api";
interface PropsForm {
  handleCancel: () => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  initialData: UserType | null;
}

const FormUser: React.FC<PropsForm> = ({
  handleCancel,
  handleCreateSuccess,
  editingId,
  initialData,
}) => {
  const formRef = useRef<FormInstance<UserType>>();
  const handleFinish = async (value: UserType) => {
    console.log("Dữ liệu user trước khi gửi đi:", value);
    try {
      if (editingId) {
        const dataToUpdate = { ...value, id: editingId };
        const res = await editUser(dataToUpdate);
        if (res.success) {
          message.success("Chỉnh sửa user thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa user");
        }
      } else {
        const res = await createUser(value);
        if (res.success) {
          message.success("Tạo user thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi tạo user");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo/chỉnh sửa user");
    }
  };
  return (
    <ProForm
      initialValues={initialData ? initialData : undefined}
      formRef={formRef}
      grid
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
                onClick={() => handleCancel()}
              >
                Đóng
              </Button>
              {dom}
            </div>
          );
        },
      }}
      onFinish={handleFinish}
    >
      <Row style={{ flex: 1 }} gutter={16}>
        <Col span={8}>
          <ProFormText
            label="Username"
            name="username"
            required
            rules={[
              {
                required: true,
                message: "Tên đăng nhập không được bỏ trống",
              },
            ]}
          />
        </Col>

        <Col span={8}>
          <ProFormText label="Mã người dùng" name="userCode" />
        </Col>

        <Col span={8}>
          <ProFormText
            label="Họ và tên"
            placeholder="Nhập họ tên"
            required
            name="name"
            rules={[
              {
                required: true,
                message: "Họ và tên không được bỏ trống",
              },
              { max: 500, message: "Vui lòng không nhập quá 500 kí tự" },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormDatePicker
            name="dob"
            label="Ngày sinh"
            fieldProps={{
              style: { width: "100%" },
            }}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Số điện thoại"
            name="phone"
            rules={[
              { max: 15, message: "Vui lòng không nhập quá 15 kí tự" },
              // { required: true, message: "Vui lòng không bỏ trống" },
            ]}
            // required
          />
        </Col>
        <Col span={8}>
          <ProFormText label="Địa chỉ" name="address" />
        </Col>
        <Col span={8}>
          <ProFormText label="Email" name="email" />
        </Col>
        <Col span={8}>
          <ProFormSelect label="Bộ môn" name="subject" />
        </Col>
        <Col span={8}>
          <ProFormText label="Lớp" name="className" />
        </Col>
        <Col span={8}>
          <ProFormSelect label="Vai trò" name="role" />
        </Col>
        <Col span={8}>
          <ProFormText.Password
            width="md"
            name="password"
            label="Password"
            required
            rules={[
              {
                required: true,
                message: "Mật khẩu không được bỏ trống",
              },
            ]}
            // hidden={!!editingId}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default FormUser;
