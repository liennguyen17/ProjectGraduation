// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Collapse,
  Drawer,
  Radio,
  Row,
  Space,
} from "antd";
import type { DrawerProps, RadioChangeEvent } from "antd";
import {
  FooterToolbar,
  ProForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormInstance,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from "@ant-design/pro-components";
import Editor from "../../Editor";

const DrawerNews: React.FC = () => {
  const content = "";
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<DrawerProps["placement"]>("right");

  const showDrawer = () => {
    setOpen(true);
  };

  const onChange = (e: RadioChangeEvent) => {
    setPlacement(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  //   const [formRef] = ProForm.useForm();
  const formRef = useRef<ProFormInstance>();
  return (
    <>
      <Space>
        {/* <Radio.Group value={placement} onChange={onChange}>
          <Radio value="top">top</Radio>
          <Radio value="right">right</Radio>
          <Radio value="bottom">bottom</Radio>
          <Radio value="left">left</Radio>
        </Radio.Group> */}
        <Button type="primary" onClick={showDrawer}>
          Open
        </Button>
      </Space>
      <Drawer
        title="Tạo tin tức"
        placement={placement}
        width={"70%"}
        onClose={onClose}
        open={open}
        // extra={
        //   <Space>
        //     <Button onClick={onClose}>Cancel</Button>
        //     <Button type="primary" onClick={onClose}>
        //       OK
        //     </Button>
        //   </Space>
        // }
        destroyOnClose
      >
        <ProForm
          formRef={formRef}
          submitter={{
            resetButtonProps: false,
            searchConfig: {
              submitText: "Lưu",
            },
            render: (_, dom) => {
              return (
                <FooterToolbar portalDom={false} style={{ width: "100%" }}>
                  <Row justify="end" gutter={[12, 12]}>
                    <Col>
                      <Button onClick={onClose}>Hủy</Button>
                    </Col>
                    <Col>{dom}</Col>
                  </Row>
                </FooterToolbar>
              );
            },
          }}
        >
          <Space direction="vertical" style={{ width: "100%" }}>
            <Collapse
              size="small"
              defaultActiveKey={["1"]}
              style={{ width: "100%" }}
              items={[
                {
                  key: "1",
                  label: "Tin tức",
                  headerClass: "header-collapsible",
                  children: (
                    <Row gutter={16}>
                      {/* <ProFormText /> */}
                      <Col span={6}>
                        <ProFormText
                          name="code"
                          label="Tiêu đề tin tức"
                          tooltip=""
                          placeholder="Nhập tiêu đề tin tức"
                          required
                          rules={[
                            {
                              message: "Vui lòng không để trống",
                              required: true,
                            },
                          ]}
                        />
                      </Col>
                      <Col span={12}>
                        <ProFormText
                          name="description"
                          label="Mô tả"
                          placeholder="Nhập mô tả"
                          required
                          rules={[
                            {
                              message: "Vui lòng không để trống",
                              required: true,
                            },
                          ]}
                        />
                      </Col>
                      <Col span={6}>
                        <ProFormSelect
                          name="type"
                          label="Thể loại"
                          placeholder="Vui lòng chọn"
                          required
                        />
                      </Col>
                      <Col span={6}>
                        <ProFormDigit
                          name="many"
                          label="Số lượng bài"
                          placeholder="Nhập dữ liệu"
                        />
                      </Col>
                      <Col span={24}>
                        <ProForm.Item name="content" label="Nội dung" required>
                          <>
                            <Editor
                              initiateData={content}
                              onChange={(event, editor) => {
                                formRef?.current?.setFieldsValue({
                                  content: editor.getData(),
                                });
                              }}
                            />
                          </>
                        </ProForm.Item>
                      </Col>
                      <Col span={24}>
                        <ProFormTextArea label="Ghi chú" name={"note"} />
                      </Col>
                      <Col span={12}>
                        <ProForm.Item label={"Chủ đề"} name="topic" required>
                          <Card bodyStyle={{ padding: 8 }}>
                            <Radio.Group>
                              <Radio style={{ padding: 12 }}>
                                Công nghệ thông tin
                              </Radio>
                              <Radio style={{ padding: 12 }}>
                                Công nghệ phần mềm
                              </Radio>
                              <Radio style={{ padding: 12 }}>
                                Công nghệ thông tin
                              </Radio>
                              <Radio style={{ padding: 12 }}>
                                Công nghệ phần mềm
                              </Radio>
                            </Radio.Group>
                          </Card>
                        </ProForm.Item>
                      </Col>
                      <Col span={12}>
                        <ProFormDatePicker
                          label="Ngày đăng"
                          required
                          width={"lg"}
                        />
                        <ProFormDatePicker
                          label="Ngày cập nhật"
                          required
                          width={"lg"}
                        />
                      </Col>
                    </Row>
                  ),
                },
              ]}
            />
            <Collapse
              size="small"
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Demo",
                  extra: <Checkbox>Xem chi tiết</Checkbox>,
                  headerClass: "header-collapsible",
                  children: (
                    <Row gutter={16}>
                      <Col span={24}>
                        <ProForm.Item name="demo" required>
                          <Row gutter={[16, 16]}>
                            <Col sm={24} md={8} lg={6} xl={6} xxl={6}>
                              <Checkbox>
                                {/* <FontAwesomeIcon
                                  style={{ marginRight: 8 }}
                                  size="1x"
                                /> */}
                              </Checkbox>
                            </Col>
                          </Row>
                        </ProForm.Item>
                      </Col>
                    </Row>
                  ),
                },
              ]}
            />
          </Space>
        </ProForm>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </>
  );
};

export default DrawerNews;
