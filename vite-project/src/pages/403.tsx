import React from "react";
import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";

const NotAuthorized: React.FC = () => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Xin lỗi. Bạn không có quyền truy vập vào trang này"
      extra={
        <Button type="primary" onClick={goBack}>
          Quay lại
        </Button>
      }
    />
  );
};

export default NotAuthorized;
