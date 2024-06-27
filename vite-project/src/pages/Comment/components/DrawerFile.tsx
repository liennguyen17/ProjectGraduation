import { ProList } from "@ant-design/pro-components";
import { Avatar, Button, Divider, Drawer, Typography } from "antd";
import { useEffect, useState } from "react";
import { ListCommentForTopicId, getListComment } from "../../../service/api";
import {
  DoubleRightOutlined,
  DownloadOutlined,
  FileOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { dataComment } from "../../../service/types";

interface DrawerFileProps {
  open: boolean;
  onClose: (isOpen: boolean) => void;
  selectedRecord: dataComment | null;
}
const { Text } = Typography;

const DrawerFile: React.FC<DrawerFileProps> = ({
  open,
  onClose,
  selectedRecord,
}) => {
  const [commentsData, setCommentData] = useState([]);
  useEffect(() => {
    const getData = async () => {
      try {
        console.log("first", selectedRecord);
        if (selectedRecord) {
          const topicId = selectedRecord.topic.id;
          const res = await ListCommentForTopicId(topicId);

          console.log("id topic", topicId);
          console.log("list comments 123:: ", res);
          setCommentData(res);
        }
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, [selectedRecord]);

  return (
    <Drawer
      title="File"
      onClose={() => onClose(false)}
      visible={open}
      width={700}
      // extra={
      //   <Button type="primary">
      //     <UploadOutlined />
      //     File
      //   </Button>
      // }
    >
      <Divider orientation="left" orientationMargin="0">
        <DoubleRightOutlined style={{ color: "hotpink", fontSize: "16px" }} />{" "}
        Sinh viên: {selectedRecord?.topic.student.name} - MSV:{" "}
        {selectedRecord?.topic.student.userCode}
      </Divider>

      <ProList<dataComment>
        dataSource={commentsData}
        headerTitle="Danh sách file sinh viên nộp"
        metas={{
          title: {
            dataIndex: "descriptionFile",
            // render: (_, row) => {
            //   return <Text>{row.topic.nameTopic}</Text>;
            // },
          },
          // avatar: {
          //   render: (_, row) => {
          //     return <Avatar src="/images/user.jpg" />;
          //   },
          // },
          // description: {
          //   render: (_, row) => (
          //     <a href={row.file} target="_blank" rel="noopener noreferrer">
          //       <DownloadOutlined /> lưu file
          //     </a>
          //   ),
          // },
          description: {
            render: (_, row) =>
              row.file ? (
                <a href={row.file} target="_blank" rel="noopener noreferrer">
                  <DownloadOutlined /> lưu file
                </a>
              ) : null,
          },
          // actions: {
          //   dataIndex: "createAt",
          //   render: (_, row) => {
          //     return <Text>{row.createAt}</Text>;
          //   },
          // },
        }}
        // pagination={{
        //   defaultPageSize: 10,
        //   showSizeChanger: true,
        //   showTotal: (total, range) =>
        //     `${range[0]}-${range[1]} trên ${total} mục`,
        // }}
      ></ProList>
    </Drawer>
  );
};
export default DrawerFile;
