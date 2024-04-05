import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { NewGetListApi } from "../../../service/newsGetList";
import { Button, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { NewsType } from "../../../service/types";

// interface News {
//   content: string;
//   createAt: string;
//   description: string;
//   file: string;
//   id: number;
//   image: string;
//   subject: string;
//   title: string;
//   updateAt: string;
//   year: string;
// }

const DisplayNew: React.FC = () => {
  const [newsData, setNewsData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await NewGetListApi();
        console.log("list news:: ", res);
        setNewsData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  const handleViewDetail = (id: number) => {
    navigate(`/news/${id}`);
  };

  return (
    <PageContainer>
      <ProList<NewsType>
        // search={{}}
        headerTitle="Danh sách tin tức"
        dataSource={newsData}
        // showActions="hover"
        itemLayout="vertical"
        // grid={{ gutter: 16, column: 2 }}
        metas={{
          title: {
            dataIndex: "title",
            title: "Tên tin tức",
          },
          //   avatar: {
          //     dataIndex: "image",
          //     search: false,
          //     render: (_, entity: News) => {
          //       return <Avatar src={entity.image} />;
          //     },
          //   },
          description: {
            // dataIndex: "subject",
            // title: "Bộ môn",
            search: false,
            render: (_, entity) => {
              return (
                <>
                  <Tag>{entity.subject}</Tag>
                  <Tag>{entity.year}</Tag>
                </>
              );
            },
          },

          subTitle: {
            dataIndex: "updateAt",
            search: false,
            render: (a) => {
              return a;
            },
          },

          extra: {
            dataIndex: "image",
            search: false,
            render: (text, row: NewsType) => {
              return <img src={row.image} alt="image" width={200} />;
            },
          },
          actions: {
            render: (text, row) => [
              <Button type="primary" onClick={() => handleViewDetail(row.id)}>
                <EyeOutlined /> xem chi tiết
              </Button>,
            ],
          },
          content: {
            render: (_, entity: NewsType) => {
              return (
                <>
                  <div>{entity.description}</div>
                </>
              );
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
    </PageContainer>
  );
};
export default DisplayNew;
