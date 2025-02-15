import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
} from "recharts";

interface Props {
  wpmData: { word: string; wpm: string }[];
}

const TypingSpeedLineChart = ({ wpmData }: Props) => {
  return (
    <LineChart
      className="m-4"
      width={750}
      height={200}
      data={wpmData}
      margin={{ top: 16, right: 32, left: 32, bottom: 16 }}
    >
      <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
      <XAxis
        dataKey={"word"}
        axisLine={{ stroke: "#ffffff" }}
        strokeWidth={2}
      />
      <YAxis axisLine={{ stroke: "#ffffff" }} dataKey={"wpm"} strokeWidth={2} />
      <Tooltip
        contentStyle={{
          backgroundColor: "#000000",
          border: "none",
        }}
      />
      <Legend />
      <Line
        type={"monotone"}
        dataKey={"wpm"}
        stroke="#ffffff"
        strokeWidth={2}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default TypingSpeedLineChart;
