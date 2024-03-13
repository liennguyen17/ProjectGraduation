import {
  ProForm,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import { Badge, Button, Col, Input, Row, Tooltip } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useRef } from "react";

export default function FormUser() {
  //   const restFormRef = useRef<ProFormInstance>();
  //   const [modalVisible, setModalVisible] = useState<boolean>(false);
  const formRef = useRef<ProFormInstance>();
  return (
    <ProForm
      formRef={formRef}
      grid
      submitter={{
        searchConfig: {
          submitText: "Xác nhận",
        },
        resetButtonProps: false,
      }}
      title="Thêm người dùng"
    >
      <Row style={{ flex: 1 }} gutter={16}>
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
    </ProForm>
  );
}
