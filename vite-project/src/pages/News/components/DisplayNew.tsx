import { PageContainer, ProList } from "@ant-design/pro-components";
import { useEffect, useState } from "react";
import { Button, Tag } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { NewsType } from "../../../service/types";
import { NewGetListApi, NewGetListData } from "../../../service/api";

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
        const res = await NewGetListData();
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
        search={{
          filterType: "query",
        }}
        headerTitle="Danh sách tin tức"
        request={async (params, sort, filter) =>
          await NewGetListApi(params, sort, filter)
        }
        itemLayout="vertical"
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
          content: {
            dataIndex: "subject",
            title: "Bộ môn",
            render: (_, entity: NewsType) => {
              return (
                <>
                  <div>{entity.description}</div>
                </>
              );
            },
          },
          subTitle: {
            dataIndex: "year",
            // search: false,
            title: "Năm bảo vệ",
            render: (a, entity) => {
              return entity.updateAt;
            },
          },
          description: {
            dataIndex: "description",
            title: "Mô tả",
            // search: false,
            render: (_, entity) => {
              return (
                <>
                  <Tag>{entity.subject}</Tag>
                  <Tag>{entity.year}</Tag>
                </>
              );
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
