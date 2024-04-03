import { ProForm, ProFormText } from "@ant-design/pro-components";
import { Button, Col, FormInstance, Row, message } from "antd";
import "../../../index.css";
import { useRef } from "react";
import { createMasterData, editMasterData } from "../../../service/api";
import { MasterData } from "../../../service/types";

interface PropsForm {
  handleCancel: () => void;
  handleCreateSuccess: () => Promise<void>;
  editingId: number | null;
  initialData: MasterData | null;
}

const MasterDataForm: React.FC<PropsForm> = ({
  handleCancel,
  handleCreateSuccess,
  editingId,
  initialData,
}) => {
  // const [formRef] = ProForm.useForm();
  const formRef = useRef<FormInstance<any>>();

  const handleFinish = async (value) => {
    try {
      if (editingId) {
        const dataToUpdate = { ...value, id: editingId };
        const res = await editMasterData(dataToUpdate);
        if (res.success) {
          message.success("Chỉnh sửa MasterData thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa MasterData");
        }
      } else {
        const res = await createMasterData(value);
        if (res.success) {
          message.success("Tạo MasterData thành công");
          handleCreateSuccess();
          handleCancel();
        } else {
          message.error("Có lỗi xảy ra khi tạo MasterData");
        }
      }
    } catch (error) {
      message.error("Có lỗi xảy ra khi tạo/chỉnh sửa MasterData");
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
            label="Mã dữ liệu"
            name="code"
            placeholder="Nhập mã..."
            required
            rules={[
              {
                required: true,
                message: "Mã không được bỏ trống",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Loại mã"
            name="type"
            placeholder="Nhập loại mã..."
            required
            rules={[
              {
                required: true,
                message: "Loại mã không được bỏ trống",
              },
            ]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Tên mã"
            name="name"
            placeholder="Nhập tên mã..."
            required
            rules={[
              {
                required: true,
                message: "Tên mã không được bỏ trống",
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default MasterDataForm;
