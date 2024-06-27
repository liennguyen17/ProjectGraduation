import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { getListComment, getListCommentTeacher } from "../../service/api";
import { Avatar, Button, Space, Tag } from "antd";
import DrawerDiary from "./components/DrawerDiary";
import DrawerFile from "./components/DrawerFile";
import { dataComment } from "../../service/types";
import CommentForm from "./components/CommentForm";
import ModalCreateDiary from "./components/ModalCreateDiary";

const Comment: React.FC = () => {
  // const [open, setOpen] = useState(false);
  // const [openFile, setOpenFile] = useState(false);
  const [openDiary, setOpenDiary] = useState(false);
  const [openFile, setOpenFile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentsData, setCommentData] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState<dataComment | null>(
    null
  );
  const [isReload, setIsReload] = useState<boolean>(false);
  // const handleViewDetail = (record: dataComment) => {
  //   setSelectedRecord(record);
  //   setOpenDiary(true);
  // };

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await getListCommentTeacher();
        console.log("list comments:: ", res);
        setCommentData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, [isReload]);

  const showDrawerDiary = (record: dataComment) => {
    setOpenDiary(true);
    setSelectedRecord(record);
  };

  const showDrawerFile = (record: dataComment) => {
    setOpenFile(true);
    setSelectedRecord(record);
  };

  const onCloseDiary = () => {
    setOpenDiary(false);
  };

  const onCloseFile = () => {
    setOpenFile(false);
  };
  const showModal = () => {
    setIsModalOpen(true);
    selectedRecord;
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOk = () => {
    setIsReload(!isReload);
  };

  return (
    <PageContainer
      // subTitle=">Nhật ký"
      title={false}
    >
      <ProList<dataComment>
        // request={async (params, sort, filter) =>
        //   await TopicGetListApi(params, sort, filter)
        // }

        dataSource={commentsData}
        headerTitle="Danh sách nhật ký"
        toolBarRender={() => {
          return [
            <Button key="3" type="primary" onClick={showModal}>
              Tạo nhật ký
            </Button>,
          ];
        }}
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
            render: (_, entity) => [
              <Button type="primary" onClick={() => showDrawerDiary(entity)}>
                Xem nhật ký
              </Button>,
              <Button type="primary" onClick={() => showDrawerFile(entity)}>
                File
              </Button>,
            ],
            search: false,
          },
        }}
      ></ProList>
      <DrawerDiary
        onClose={onCloseDiary}
        open={openDiary}
        selectedRecord={selectedRecord}
      />
      <DrawerFile
        onClose={onCloseFile}
        open={openFile}
        selectedRecord={selectedRecord}
      />
      <ModalCreateDiary
        open={isModalOpen}
        onClose={handleCancel}
        handleOk={handleOk}
      />
    </PageContainer>
  );
};
export default Comment;
