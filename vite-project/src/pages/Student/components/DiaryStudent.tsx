import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { Avatar, Button, Modal, Space, Tag } from "antd";
import { getListCommentStudent } from "../../../service/api";
import { dataComment } from "../../../service/types";

import DrawerFile from "./DrawerFile";
import FormFile from "./FormFile";

const DiaryStudent: React.FC = () => {
  const [openFile, setOpenFile] = useState(false);
  const [commentsData, setCommentData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<dataComment | null>(
    null
  );
  const [isReload, setIsReload] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
    selectedRecord;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getListCommentStudent();
        console.log("list comments:: ", res);
        setCommentData(res);
        console.log("abc:: ", commentsData);
        // setSelectedRecord(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  // const showDrawerDiary = (record: dataComment) => {
  //   setOpenDiary(true);
  //   setSelectedRecord(record);
  // };

  // const showDrawerFile = (record: dataComment) => {
  //   setOpenFile(true);
  //   setSelectedRecord(record);
  // };

  const showDrawerFile1 = () => {
    setOpenFile(true);
  };

  // const onCloseDiary = () => {
  //   setOpenDiary(false);
  // };

  const onCloseFile = () => {
    setOpenFile(false);
  };
  const handleOk = () => {
    setIsReload(!isReload);
  };

  return (
    <PageContainer
      // subTitle="Nhật ký"
      title="Nhật ký từ giáo viên hướng dẫn"
    >
      <ProList<dataComment>
        toolBarRender={() => {
          return [
            <Button key="3" type="primary" onClick={showModal}>
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
        // commentsData={commentsData}
      />
      <Modal
        width={500}
        footer={false}
        destroyOnClose
        title="Nộp file"
        open={isModalOpen}
        onOk={handleCancel}
        onCancel={handleCancel}
      >
        <FormFile
          handleCancel={handleCancel}
          handleOk={handleOk}
          // selectedRecord={selectedRecord}
          // commentsData={commentsData}
        ></FormFile>
      </Modal>
    </PageContainer>
  );
};
export default DiaryStudent;
