import { Bar } from "@ant-design/plots";

interface Props {
  data: any[];
}

const SubjectStudent: React.FC<Props> = ({ data }) => {
  const config = {
    data,
    xField: "subject",
    yField: "students",
    shapeField: "hollow",
    colorField: "subject",
    legend: {
      color: { size: 72, autoWrap: true, maxRows: 3, cols: 6 },
    },
  };
  return <Bar {...config} />;
};

export default SubjectStudent;
