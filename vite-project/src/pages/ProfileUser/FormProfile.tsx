import {
  ProForm,
  ProFormDatePicker,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import { Button, Col, FormProps, Row, message } from "antd";
import { FormInstance } from "antd/lib";
import { useRef } from "react";
import { UserType } from "../../service/types";
import { handleFilterMasterData } from "../../service/utils";
import { editUser } from "../../service/api";

interface FormProps {
  data: UserType | undefined;
  editingId: number | null;
  onClose: () => void;
  setData: React.Dispatch<React.SetStateAction<UserType | undefined>>;
  actionRef?: () => void;
}

const FormProfile: React.FC<FormProps> = ({
  data,
  editingId,
  onClose,
  setData,
  actionRef,
}) => {
  const formRef = useRef<FormInstance<UserType>>();

  const handleFinish = async (value: UserType) => {
    console.log("first", editingId);
    try {
      if (editingId) {
        const dataToUpdate = {
          // ...data,
          ...value,
          id: editingId,
        };
        const res = await editUser(dataToUpdate);
        // setData(res);
        if (res.success) {
          actionRef?.();
          message.success("Chỉnh sửa thông tin thành công");
          onClose();
        } else {
          const errorText = res?.error?.errors[0]?.message;
          message.error(
            `${errorText}` || "Có lỗi xảy ra khi cập nhật thông tin người dùng"
          );
        }
      } else {
        return [];
      }
    } catch (error) {
      message.error("Lỗi khi cập nhật thông tin người dùng!");
    }
  };
  return (
    <ProForm
      // actionRef={actionRef}
      initialValues={data}
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
                onClick={() => onClose()}
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
        <Col span={24}>
          <ProFormText
            disabled
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

        {/* <Col span={24}>
          <ProFormText label="Mã người dùng" name="userCode" />
        </Col> */}

        <Col span={24}>
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
        <Col span={24}>
          <ProFormDatePicker
            name="dob"
            label="Ngày sinh"
            fieldProps={{
              style: { width: "100%" },
            }}
          />
        </Col>
        <Col span={24}>
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
        <Col span={24}>
          <ProFormText label="Địa chỉ" name="address" />
        </Col>
        <Col span={24}>
          <ProFormText label="Email" name="email" />
        </Col>
        <Col span={24}>
          <ProFormSelect
            label="Bộ môn"
            name="subject"
            request={() => handleFilterMasterData("subject")}
          />
        </Col>
        {/* {!initialData?.role === "TEACHER" && (
            <Col span={8}>
              <ProFormText label="Lớp" name="className" />
            </Col>
          )} */}

        {/* {!(
            initialData?.role === "TEACHER" ||
            initialData?.role === "MANAGER" ||
            initialData?.role === "ADMIN"
          ) && (
            <Col span={8}>
              <ProFormText label="Lớp" name="className" />
            </Col>
          )} */}
      </Row>
    </ProForm>
  );
};
export default FormProfile;
