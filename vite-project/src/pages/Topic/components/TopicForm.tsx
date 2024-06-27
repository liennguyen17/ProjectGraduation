import {
  Button,
  Col,
  Form,
  FormInstance,
  InputNumber,
  Row,
  message,
} from "antd";
import { TopicType } from "../../../service/types";
import { useEffect, useRef, useState } from "react";
import {
  ProForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
} from "@ant-design/pro-components";
import {
  handleFilterStudent,
  handleFilterTeacher,
} from "../../../service/utils";
import { editTopic } from "../../../service/api";

interface FormProps {
  handleCancel: () => void;
  editingId: number | null;
  actionRef?: () => void;
  initialData: TopicType | null;
}
const TopicForm: React.FC<FormProps> = ({
  handleCancel,
  editingId,
  actionRef,
  initialData,
}) => {
  const formRef = useRef<FormInstance<TopicType>>();
  const [currentFormData, setCurrentFormData] = useState<TopicType | null>(
    initialData
  );

  useEffect(() => {
    // Đặt lại giá trị của form khi initialData thay đổi
    if (initialData) {
      formRef.current?.setFieldsValue(initialData);
    }
  }, [initialData]);

  const handleFinish = async (value) => {
    try {
      if (editingId) {
        console.log("dlc::", initialData);
        const studentId = initialData?.student.id;
        const teacherId = initialData?.teacher.id;
        const dataUpdate = {
          ...initialData,
          ...value,
          id: editingId,
          studentId: studentId,
          teacherId: teacherId,
        };

        const res = await editTopic(dataUpdate);
        console.log("res:: ", res);
        if (res.success) {
          message.success("Chỉnh sửa đề tài thành công");
          handleCancel();
          actionRef?.();
        } else {
          message.error("Có lỗi xảy ra khi chỉnh sửa đề tài");
        }
      }
    } catch (error) {
      message.error("Lỗi cập nhật điểm đề tài vui lòng thử lại sau.");
    }
  };

  const validateDecimalNumber = (value: string) => {
    const regex = /^(?:0|[1-9](?:\d)?)(?:\.\d{1,2})?$/;
    return regex.test(value) && parseFloat(value) > 0 && parseFloat(value) < 10;
  };

  return (
    <ProForm
      initialValues={initialData}
      formRef={formRef}
      submitter={{
        resetButtonProps: false,
        searchConfig: {
          submitText: "Xác nhận",
        },
        render({ form }, dom) {
          // console.log("dom", dom);
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
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <ProFormText
            name="nameTopic"
            label="Tên đề tài"
            placeholder="Nhập tên đề tài"
            rules={[
              {
                message: "Vui lòng không để trống",
                required: true,
              },
            ]}
            // disabled
            hidden
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="student"
            label="Sinh viên"
            // value={initialData ? initialData.student.id : undefined}
            request={() => handleFilterStudent()}
            // placeholder="Vui lòng chọn sinh viên"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng chọn sinh viên!",
            //   },
            // ]}
            hidden
          />
        </Col>
        <Col span={8}>
          <ProFormSelect
            name="teacher"
            label="Giảng viên hướng dẫn"
            request={() => handleFilterTeacher()}
            // placeholder="Vui lòng chọn giảng viên"
            // rules={[
            //   {
            //     required: true,
            //     message: "Vui lòng chọn giảng viên!",
            //   },
            // ]}
            hidden
          />
        </Col>
        {/* <Col span={8}>
          <ProFormText
            width="md"
            name="decimalNumber"
            label="Số thập phân (0 < x < 10)"
            placeholder="Nhập số thập phân"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col> */}

        <Col span={8}>
          {/* <ProFormDigit */}
          <ProFormText
            name="scoresInternshipFacility"
            label="Điểm tại cơ sở thực tập"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
            // min={1}
            // max={10}
            // fieldProps={{
            //   inputMode: "decimal",
            // }}
          />
        </Col>
        {/* <Col span={8}>
          <ProFormDigit
            name="instructor"
            label="Điểm giáo viên hướng dẫn"
            placeholder="Nhập điểm"
            // rules={[
            //   {
            //     message: "Vui lòng không để trống",
            //     required: true,
            //   },
            // ]}
            min={1}
            max={10}
          />
        </Col> */}
        <Col span={8}>
          <ProFormText
            width="md"
            name="instructor"
            label="Điểm giáo viên hướng dẫn"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col>
        <Col span={8}>
          {/* <ProFormDigit */}
          <ProFormText
            name="reviewer"
            label="Điểm giáo viên phản biện"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col>
        <Col span={8}>
          {/* <ProFormDigit */}
          <ProFormText
            name="boardMembers1"
            label="Điểm thành viên hội đồng thứ nhất"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col>
        <Col span={8}>
          {/* <ProFormDigit */}
          <ProFormText
            name="boardMembers2"
            label="Điểm thành viên hội đồng thứ hai"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col>
        <Col span={8}>
          {/* <ProFormDigit */}
          <ProFormText
            name="boardMembers3"
            label="Điểm thành viên hội đồng thứ ba"
            placeholder="Nhập điểm"
            rules={[
              {
                validator: (_, value) => {
                  if (!value || validateDecimalNumber(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "Giá trị phải là số thập phân từ 0 đến 10 (ví dụ: 1.23)"
                    )
                  );
                },
              },
            ]}
          />
        </Col>
      </Row>
    </ProForm>
  );
};
export default TopicForm;
