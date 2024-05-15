import React from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

// const data = [
//   { type: "Khóa 65", value: 27 },
//   { type: "Khóa 66", value: 25 },
//   { type: "Khóa 67", value: 18 },
//   { type: "Khóa 68", value: 15 },
//   { type: "Khóa 64", value: 10 },
//   { type: "Khóa 63", value: 5 },
// ];
interface Props {
  data: any[];
}
const StudentStatistic: React.FC<Props> = ({ data }) => {
  const config = {
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      text: (d) => `${d.type}\n ${d.value}`,
      position: "spider",
    },
    legend: {
      color: {
        title: false,
        position: "right",
        rowPadding: 5,
      },
    },
  };
  return <Pie {...config} />;
};

export default StudentStatistic;
