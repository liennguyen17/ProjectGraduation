import { Column } from "@ant-design/plots";

interface Props {
  data: any[];
}

const StatisticsSuccess: React.FC<Props> = ({ data }) => {
  const config = {
    data: data,
    xField: "type",
    yField: "quantity",
    scale: {
      x: { padding: 0.5 },
    },
    style: {
      maxWidth: 200,
    },
  };
  return <Column {...config} />;
};

export default StatisticsSuccess;
