import { StatisticCard } from "@ant-design/pro-components";
import RcResizeObserver from "rc-resize-observer";
import { useEffect, useState } from "react";
import {
  QuantityManagerGetListApi,
  QuantityStudentGetListApi,
  QuantityTeacherGetListApi,
  QuantityUserGetListApi,
} from "../../../service/api";

const imgStyle = {
  display: "block",
  width: 42,
  height: 42,
};

const QuantityUser: React.FC = ({}) => {
  const [responsive, setResponsive] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await QuantityUserGetListApi();
        setData1(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await QuantityManagerGetListApi();
        setData2(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await QuantityTeacherGetListApi();
        setData3(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await QuantityStudentGetListApi();
        setData4(res);
      } catch (error) {
        console.error("Loi lay du lieu: ", error);
      }
    };
    data();
  }, []);

  return (
    <RcResizeObserver
      key="resize-observer"
      onResize={(offset) => {
        setResponsive(offset.width < 596);
      }}
    >
      <StatisticCard.Group direction={responsive ? "column" : "row"}>
        <StatisticCard
          statistic={{
            title: "Tổng số user",
            value: data1,
            icon: (
              <img
                style={imgStyle}
                src="https://png.pngtree.com/png-clipart/20230823/original/pngtree-users-group-avatar-together-illustration-picture-image_8282908.png"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: "Tổng số giảng viên quản lý",
            value: data2,
            icon: (
              <img
                style={imgStyle}
                src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-manager-icon-digital-manager-vector-picture-image_10527250.png"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: "Tổng số giảng viên hướng dẫn",
            value: data3,
            icon: (
              <img
                style={imgStyle}
                src="https://png.pngtree.com/png-clipart/20230813/original/pngtree-teacher-professor-symbol-teacher-vector-picture-image_10528355.png"
                alt="icon"
              />
            ),
          }}
        />
        <StatisticCard
          statistic={{
            title: "Tổng số sinh viên",
            value: data4,
            icon: (
              <img
                style={imgStyle}
                src="https://png.pngtree.com/png-clipart/20231124/original/pngtree-graduation-blue-glossy-icon-on-white-background-www-graduation-icon-picture-image_13281313.png"
                alt="icon"
              />
            ),
          }}
        />
      </StatisticCard.Group>
    </RcResizeObserver>
  );
};

export default QuantityUser;
