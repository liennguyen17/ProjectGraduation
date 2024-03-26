import { ProList } from "@ant-design/pro-components";
import { Avatar, Button, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { getListComment } from "../../../service/api";

interface dataComment {
  message: string;
  createBy: string;
  file: string;
  topic: {
    id: number;
    student: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: string;
      userCode: string;
      className: string;
    };
    teacher: {
      id: number;
      name: string;
      email: string;
      phone: string;
      role: string;
      userCode: string;
      className: null;
    };
    status: string;
    semester: string;
    nameTopic: string;
    departmentManagement: string;
    nameInternshipFacility: string;
    menterInternshipFacility: string;
    phoneInstructorInternshipFacility: string;
  };
  createAt: string;
}

interface DrawerProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}
const { Text } = Typography;

const DrawerDiary: React.FC<DrawerProps> = ({ open, onClose }) => {
  const [commentsData, setCommentData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getListComment();
        console.log("list comments:: ", res);
        setCommentData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  return (
    <Drawer
      title="Nhật ký"
      onClose={() => onClose(false)}
      visible={open}
      width={700}
      extra={<Button type="primary">Tạo nhật ký</Button>}
    >
      <ProList<dataComment>
        dataSource={commentsData}
        // toolBarRender={() => {
        //   return [
        //     <Button key="3" type="primary">
        //       Tạo nhật ký
        //     </Button>,
        //   ];
        // }}
        headerTitle="Danh sách nhật ký đã gửi"
        metas={{
          title: {
            dataIndex: "message",
          },
          avatar: {
            render: () => {
              return <Avatar src="/images/user.jpg" />;
            },
          },
          actions: {
            dataIndex: "createAt",
            render: (_, row) => {
              return <Text>{row.createAt}</Text>;
            },
          },
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} trên ${total} mục`,
        }}
      ></ProList>
      {/* <ProDescriptions>dsafaklfdj; demo demo </ProDescriptions> */}
    </Drawer>
  );
};
export default DrawerDiary;
