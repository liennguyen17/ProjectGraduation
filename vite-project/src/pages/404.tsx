import React from "react";
import { Button, Result } from "antd";
import { PageContainer } from "@ant-design/pro-components";

import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  const goTo = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      <Result
        status="404"
        title="404"
        subTitle="Xin lỗi. Trang mà bạn truy cập không tồn tại"
        extra={
          <Button type="primary" onClick={goTo}>
            Trang chủ
          </Button>
        }
      />
    </PageContainer>
  );
};

export default NotFound;
