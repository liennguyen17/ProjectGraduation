import { PageContainer } from "@ant-design/pro-components";
import StatisticsSuccess from "./components/StatisticsSuccess";
import { Button, Divider, Input, Skeleton, Spin } from "antd";
import {
  StudentStatisticApi,
  getStatistics,
  getStudentsBySubject,
} from "../../service/api";
import { useEffect, useState } from "react";
import QuantityUser from "./components/QuantityUser";
import StudentStatistic from "./components/Student";
import SubjectStudent from "./components/SubjectStudent";

const Statistics: React.FC = () => {
  const [semester, setSemester] = useState<string>("");

  const [statisticsData, setStatisticsData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [isInputEmpty, setIsInputEmpty] = useState<boolean>(true);
  const [dataStudent, setDataStudent] = useState([]);
  const [dataStudent1, setDataStudent1] = useState([]);

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

  useEffect(() => {
    const data = async () => {
      try {
        const res = await StudentStatisticApi();
        setDataStudent(res.data);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await getStudentsBySubject();
        setDataStudent1(res.data);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);

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
      <div style={{ width: "90%" }}>
        <Divider orientation="left" orientationMargin="0">
          <h3>Thống kê số lượng sinh viên các khóa làm KLTN</h3>
        </Divider>
        <StudentStatistic data={dataStudent} />
        <Divider>
          <h4 style={{ color: "#5c5a5a" }}>
            Biểu đồ thống kê số lượng sinh viên các khóa làm KLTN
          </h4>
        </Divider>
      </div>

      <div style={{ width: "90%", marginBottom: 20, marginTop: 70 }}>
        <Divider orientation="left" orientationMargin="0">
          <h3>Thống kê số lượng sinh viên thuộc các bộ môn làm KLTN</h3>
        </Divider>
        <SubjectStudent data={dataStudent1} />
        <Divider>
          <h4 style={{ color: "#5c5a5a" }}>
            Biểu đồ thống kê số lượng sinh viên thuộc các bộ môn làm KLTN
          </h4>
        </Divider>
      </div>

      <div style={{ width: "90%", marginBottom: 20, marginTop: 70 }}>
        <Divider orientation="left" orientationMargin="0">
          <h3>Thống kê kết quả sinh viên làm KLTN trong kỳ</h3>
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
          <h4 style={{ color: "#5c5a5a" }}>
            Biểu đồ thống kê kết quả số sinh viên trong kỳ
          </h4>
        </Divider>
      </div>
    </PageContainer>
  );
};
export default Statistics;
