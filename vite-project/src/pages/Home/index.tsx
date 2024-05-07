import { Input, Button, Typography, Tag, Divider } from "antd";
import "./styles.css"; // Import file CSS riêng
import { PageContainer, ProList } from "@ant-design/pro-components";
import { useNavigate } from "react-router-dom";
import { ReactNode, useEffect, useState } from "react";
import { NewGetListApiHome, NewsFilterApi } from "../../service/api";
import { NewsTypeHome } from "../../service/types";

const { Search } = Input;

const Home = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/auth/login");
  };
  const handleViewDetail = (id: number) => {
    navigate(`/news/${id}`);
  };
  const [newsData, setNewsData] = useState<NewsTypeHome[]>([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await NewGetListApiHome();
        console.log("list news:: ", res);
        setNewsData(res);
      } catch (error) {
        console.error("loi lay du lieu:", error);
      }
    };
    getData();
  }, []);

  const handleSearch = async (value: string) => {
    setSearchKeyword(value);
    try {
      const searchResults = await NewsFilterApi(value);
      console.log("Kết quả tìm kiếm:", searchResults);
      setSearchResults(searchResults);
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
      setSearchResults([]);
    }
  };

  const selectedNewsData = searchKeyword ? searchResults : newsData;

  const { Title } = Typography;
  return (
    <PageContainer
      // style={{ textAlign: "center", fontSize: "30px" }}
      extra={[
        <Button onClick={handleLoginClick} type="primary">
          Đăng nhập
        </Button>,
      ]}
    >
      <div className="title-logo">
        <img src="images/images.png" alt="Logo" className="logo" />
        <span className="title">Hệ thống quản lý khóa luận tốt nghiệp</span>
      </div>
      <div className="home-container">
        <div className="search-bar">
          <Search
            className="search-input"
            placeholder="Tìm kiếm bài khóa luận tốt nghiệp..."
            enterButton
            style={{ width: "45%" }}
            onSearch={handleSearch}
          />
        </div>
        <Divider>
          <Title
            level={4}
            style={{
              marginBottom: "50px",
              textAlign: "center",
              // fontSize: "25px",
            }}
          >
            Danh sách khóa luận tốt nghiệp
          </Title>
        </Divider>
        <ProList<NewsTypeHome>
          // search={{}}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} trên ${total} mục`,
          }}
          dataSource={selectedNewsData}
          itemLayout="vertical"
          metas={{
            title: {
              dataIndex: "title",
              title: "title",
              render: (dom: ReactNode) => {
                return dom;
              },
            },
            description: {
              dataIndex: "description",
              render: (dom, entity) => {
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
              render: (dom, entity: NewsTypeHome) => {
                console.log("image", entity);
                // <img width={272} alt="logo" src={entity.image} />
                return (
                  <img
                    // width="100%"
                    width={272}
                    alt="logo"
                    src={entity.image}
                  />
                );
              },
            },
            content: {
              dataIndex: "description",
              render: (dom: ReactNode) => {
                return dom;
              },
            },
            actions: {
              render: (_, entity) => [
                <Button
                  style={{ marginTop: "5px" }}
                  type="primary"
                  onClick={() => handleViewDetail(entity.id)}
                >
                  Xem chi tiết
                </Button>,
              ],
            },
          }}
        />

        {searchKeyword !== "" && searchResults.length === 0 && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>Không có kết quả phù hợp với tìm kiếm của bạn.</p>
          </div>
        )}
      </div>
    </PageContainer>
  );
};

export default Home;
