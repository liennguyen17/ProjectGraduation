import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { Avatar, Button, Divider, Space, Tag } from "antd";
import { getListCommentStudent } from "../../../service/api";
import { dataComment } from "../../../service/types";
import { ArrowRightOutlined, DoubleRightOutlined } from "@ant-design/icons";
import DrawerFile from "./DrawerFile";

const DiaryStudent: React.FC = () => {
  // const [open, setOpen] = useState(false);
  // const [openFile, setOpenFile] = useState(false);
  const [openDiary, setOpenDiary] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [commentsData, setCommentData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<dataComment | null>(
    null
  );
  // const handleViewDetail = (record: dataComment) => {
  //   setSelectedRecord(record);
  //   setOpenDiary(true);
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getListCommentStudent();
        // console.log("list comments:: ", res);
        setCommentData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  const showDrawerDiary = (record: dataComment) => {
    setOpenDiary(true);
    setSelectedRecord(record);
  };

  const showDrawerFile = (record: dataComment) => {
    setOpenFile(true);
    setSelectedRecord(record);
  };

  const showDrawerFile1 = () => {
    setOpenFile(true);
  };

  const onCloseDiary = () => {
    setOpenDiary(false);
  };

  const onCloseFile = () => {
    setOpenFile(false);
  };

  return (
    <PageContainer
      // subTitle="Nhật ký"
      title="Nhật ký từ giáo viên hướng dẫn"
    >
      <ProList<dataComment>
        toolBarRender={() => {
          return [
            <Button key="3" type="primary">
              Nộp file
            </Button>,
            <Button key="3" type="primary" onClick={() => showDrawerFile1()}>
              Danh sách file
            </Button>,
          ];
        }}
        dataSource={commentsData}
        metas={{
          title: {
            render: (_, entity) => {
              return (
                <Space size={0}>
                  {/* <Tag color="blue">{entity.topic.student.name}</Tag> */}
                  GV:{entity.topic.teacher.name}
                </Space>
              );
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
          //   actions: {
          //     render: (_, entity) => [
          //       <Button type="primary" onClick={() => showDrawerDiary(entity)}>
          //         Xem nhật ký
          //       </Button>,
          //       <Button type="primary" onClick={() => showDrawerFile(entity)}>
          //         File
          //       </Button>,
          //     ],
          //     search: false,
          //   },
        }}
      ></ProList>
      {/* <DrawerDiary
        onClose={onCloseDiary}
        open={openDiary}
        selectedRecord={selectedRecord}
      /> */}
      <DrawerFile
        onClose={onCloseFile}
        open={openFile}
        selectedRecord={selectedRecord}
      />
    </PageContainer>
  );
};
export default DiaryStudent;
