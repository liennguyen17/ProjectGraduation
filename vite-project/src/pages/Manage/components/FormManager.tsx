import { Button, Col, FormInstance, Row, message } from "antd";
import { UserType } from "../../../service/types";
import { useRef } from "react";
import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { createUser } from "../../../service/api";
import { handleFilterMasterData } from "../../../service/utils";

interface PropsForm {
  handleCancel: () => void;
  //   editingId: number | null;
  initialData: UserType | null;
  actionRef?: () => void;
}

const FormManager: React.FC<PropsForm> = ({
  handleCancel,
  //   editingId,
  initialData,
  actionRef,
}) => {
  const formRef = useRef<FormInstance<UserType>>();
  const handleFinish = async (value: UserType) => {
    try {
      const res = await createUser(value);
      if (res.success) {
        message.success("Tạo user thành công");
        // handleCreateSuccess();
        handleCancel();
        actionRef?.();
      } else {
        const errorText = res?.error?.errors[0]?.message;
        message.error(`${errorText}` || "Có lỗi xảy ra khi tạo người dùng");
      }
    } catch (error) {
      message.error("Lỗi tạo giảng viên quản lý, vui lòng thử lại sau.");
    }
  };
  return (
    <ProForm
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
          <ProFormText
            label="Mã giảng viên"
            name="userCode"
            required
            rules={[
              {
                required: true,
                message: "Mã người dùng không được bỏ trống",
              },
            ]}
          />
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
          <ProFormText
            label="Email"
            name="email"
            required
            rules={[
              {
                required: true,
                message: "Email không được bỏ trống",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            label="Bộ môn"
            name="subject"
            request={() => handleFilterMasterData("subject")}
          />
        </Col>

        <Col span={8}>
          <ProFormText
            label="Vai trò"
            name="role"
            // request={() => handleFilterMasterData("role")}
            initialValue={"MANAGER"}
            disabled
          />
        </Col>
        {!initialData && (
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
            />
          </Col>
        )}
      </Row>
    </ProForm>
  );
};
export default FormManager;
