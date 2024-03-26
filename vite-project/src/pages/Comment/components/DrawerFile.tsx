import { ProList } from "@ant-design/pro-components";
import { Avatar, Button, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { getListComment } from "../../../service/api";
import {
  DownloadOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";

interface dataComment {
  message: string;
  createBy: string;
  file: string;
  descriptionFile: string;
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

interface DrawerFileProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
}
const { Text } = Typography;

const DrawerFile: React.FC<DrawerFileProps> = ({ open, onClose }) => {
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
      title="File"
      onClose={() => onClose(false)}
      visible={open}
      width={700}
      extra={
        <Button type="primary">
          <UploadOutlined />
          File
        </Button>
      }
    >
      <ProList<dataComment>
        dataSource={commentsData}
        headerTitle="Danh sách file"
        metas={{
          title: {
            dataIndex: "descriptionFile",
            // render: (_, row) => {
            //   return <Text>{row.topic.nameTopic}</Text>;
            // },
          },
          avatar: {
            render: (_, row) => {
              return <Avatar src="/images/user.jpg" />;
            },
          },
          description: {
            render: (_, row) => (
              <a href={row.file} target="_blank" rel="noopener noreferrer">
                <DownloadOutlined /> lưu file
              </a>
            ),
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
    </Drawer>
  );
};
export default DrawerFile;
