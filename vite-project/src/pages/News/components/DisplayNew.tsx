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
        // dataSource={newsData}
        request={async (params, sort, filter) =>
          await NewGetListApi(params, sort, filter)
        }
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
          content: {
            dataIndex: "subject",
            title: "Bộ môn",
            // valueType: "select",
            // valueEnum: {
            //   all: { text: "全部", status: "Default" },
            //   open: {
            //     text: "Công nghệ thông tin",
            //     status: "Error",
            //   },
            //   closed: {
            //     text: "An toàn thông tin",
            //     status: "Success",
            //   },
            //   processing: {
            //     text: "Trí tuệ nhân tạo",
            //     status: "Processing",
            //   },
            // },
            render: (_, entity: NewsType) => {
              return (
                <>
                  <div>{entity.description}</div>
                </>
              );
            },
          },

          description: {
            dataIndex: "description",
            title: "Mo ta",
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
