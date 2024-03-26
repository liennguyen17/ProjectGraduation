import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { getListComment } from "../../service/api";
import { Avatar, Button, Space, Tag } from "antd";
import DrawerDiary from "./components/DrawerDiary";
import DrawerFile from "./components/DrawerFile";

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

const Comment: React.FC = () => {
  // const [open, setOpen] = useState(false);
  // const [openFile, setOpenFile] = useState(false);
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

  const [openDiary, setOpenDiary] = useState(false);
  const [openFile, setOpenFile] = useState(false);

  const showDrawerDiary = () => {
    setOpenDiary(true);
  };

  const showDrawerFile = () => {
    setOpenFile(true);
  };

  const onCloseDiary = () => {
    setOpenDiary(false);
  };

  const onCloseFile = () => {
    setOpenFile(false);
  };
  return (
    <PageContainer subTitle="Hành động" title={false}>
      <ProList<dataComment>
        dataSource={commentsData}
        headerTitle="Hành động"
        metas={{
          title: {
            render: (_, entity) => {
              return entity.topic.student.name;
            },
          },
          avatar: {
            render: () => {
              return <Avatar src="/images/user.jpg" />;
            },
          },
          description: {
            dataIndex: "message",
          },
          subTitle: {
            dataIndex: "labels",
            render: (_, row) => {
              return (
                <Space size={0}>
                  <Tag color="blue">{row.createAt}</Tag>
                </Space>
              );
            },
            search: false,
          },
          actions: {
            render: () => [
              <Button type="primary" onClick={showDrawerDiary}>
                Nhật ký
              </Button>,
              <Button type="primary" onClick={showDrawerFile}>
                File
              </Button>,
            ],
            search: false,
          },
        }}
      ></ProList>
      <DrawerDiary onClose={onCloseDiary} open={openDiary} />
      <DrawerFile onClose={onCloseFile} open={openFile} />
    </PageContainer>
  );
};
export default Comment;
