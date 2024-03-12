import {
  ModalForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import type { ProFormInstance } from "@ant-design/pro-components";
import { Badge, Button, Col, Flex, Input, Row, Tooltip } from "antd";
import { FrownOutlined } from "@ant-design/icons";
import { SearchOutlined } from "@ant-design/icons";
import { useRef, useState } from "react";

export default function ModalFormStudent() {
  const restFormRef = useRef<ProFormInstance>();
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  return (
    <ModalForm
      open={modalVisible}
      trigger={
        <Button
          type="primary"
          onClick={() => {
            setModalVisible(true);
          }}
        >
          Tạo người dùng
        </Button>
      }
      onOpenChange={setModalVisible}
      modalProps={{
        destroyOnClose: true,
        okText: "Xác nhận",
      }}
      className="modal-form-student"
      formRef={restFormRef}
      title="Tạo sinh viên"
    >
      <Row gutter={16}>
        <Col span={8}>
          <ProForm.Item label="Tài khoản" required name="username">
            <Input.Group compact>
              <Input
                style={{ width: "calc(100% - 80px)" }}
                allowClear
                placeholder="Nhập tài khoản"
                // disabled
                name="username"
                // onKeyDown={}
                // onChange={}
                defaultValue="liennguyen"
                required
              />
              <Tooltip title="Lấy dữ liệu">
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  // disabled
                  // onClick={}
                >
                  Tìm
                </Button>
              </Tooltip>
            </Input.Group>
          </ProForm.Item>
        </Col>
        <Col span={8}>
          <ProFormText
            label="Email"
            name="email"
            // disabled
            rules={[{ max: 100, message: "Vui lòng không nhập quá 100 kí tự" }]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            label="Trạng thái"
            required
            name="usrStatus"
            allowClear={false}
            valueEnum={{
              ACTIVE: { text: <Badge status="success" text="Hoạt động" /> },
              INACTIVE: {
                text: <Badge status="error" text="Không hoạt động" />,
              },
            }}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Họ và tên"
            placeholder="Nhập họ tên"
            // disabled
            name="name"
            rules={[{ max: 500, message: "Vui lòng không nhập quá 500 kí tự" }]}
          />
        </Col>
        <Col span={8}>
          <ProFormTextArea
            label="Bộ môn"
            name="usrPosition"
            // disabled
            fieldProps={{
              autoSize: {
                minRows: 1,
                maxRows: 3,
              },
            }}
            rules={[{ max: 500, message: "Vui lòng không nhập quá 500 kí tự" }]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Số điện thoại"
            name="phone"
            rules={[
              { max: 15, message: "Vui lòng không nhập quá 15 kí tự" },
              { required: true, message: "Vui lòng không bỏ trống" },
            ]}
            required
            // rules={[{ required: true, message: 'Vui lòng không bỏ trống' }]}
          />
        </Col>
        <Col span={8}>
          <ProFormText
            label="Địa chỉ"
            name="address"
            // required
            // rules={[
            //   { required: true, message: 'Vui lòng không bỏ trống' },
            //   { max: 500, message: 'Vui lòng không nhập quá 500 kí tự' },
            // ]}
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            label="Nhóm"
            name="grpCode"
            required
            // showSearch
          />
        </Col>
      </Row>
    </ModalForm>
  );
}
