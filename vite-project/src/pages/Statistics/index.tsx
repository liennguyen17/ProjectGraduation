import { PageContainer } from "@ant-design/pro-components";
import StatisticsSuccess from "./components/StatisticsSuccess";
import { Button, Divider, Input, Skeleton, Spin } from "antd";
import { getStatistics } from "../../service/api";
import { useState } from "react";
import QuantityUser from "./components/QuantityUser";

const Statistics: React.FC = () => {
  const [semester, setSemester] = useState<string>("");

  const [statisticsData, setStatisticsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);

  const handleSemesterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSemester(event.target.value);
    setIsInputEmpty(event.target.value === "");
  };

  const handleFetchStatistics = async () => {
    setLoading(true);
    try {
      const response = await getStatistics(semester);
      setStatisticsData(response.data);
    } catch (error) {
      console.error("Error fetching statistics:", error);
    }
    setLoading(false);
  };
  return (
    <PageContainer
      childrenContentStyle={{
        paddingInline: 12,
        paddingBlock: 4,
      }}
      title={false}
      footer={[]}
    >
      <QuantityUser />
      <div style={{ marginBottom: 20 }}>
        <Divider orientation="left" orientationMargin="0">
          Thống kê
        </Divider>
        <Input
          style={{ width: 200, marginRight: 10 }}
          placeholder="Nhập kỳ: ex:Kỳ 2 năm 2024"
          value={semester}
          onChange={handleSemesterChange}
        />
        <Button type="primary" onClick={handleFetchStatistics}>
          Thống kê
        </Button>
        <Divider></Divider>
        <Spin spinning={loading}>
          {isInputEmpty ? (
            <Skeleton active />
          ) : (
            <StatisticsSuccess data={statisticsData} />
          )}
        </Spin>
        <Divider>
          <h4>Biểu đồ thống kê kết quả số sinh viên trong kỳ</h4>
        </Divider>
      </div>
    </PageContainer>
  );
};
export default Statistics;
