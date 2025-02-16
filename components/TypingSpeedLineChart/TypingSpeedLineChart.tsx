import {
  Line,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface Props {
  wpmData: { word: string; wpm: number; isCorrect: boolean }[];
}

const TypingSpeedLineChart = ({ wpmData }: Props) => {
  return (
    <div className="flex h-48 w-[50rem]">
      <ResponsiveContainer width={"100%"} height={"100%"}>
        <LineChart
          data={wpmData}
          width={768}
          margin={{ top: 16, right: 32, left: 16, bottom: 4 }}
        >
          <XAxis
            dataKey={"word"}
            axisLine={{ stroke: "#ffffff" }}
            strokeWidth={2}
          />
          <YAxis
            dataKey={"wpm"}
            axisLine={{ stroke: "#ffffff" }}
            strokeWidth={2}
          />
          <CartesianGrid strokeDasharray="3 3" stroke="#666666" />
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
            dot={({ cx, cy, payload }) => {
              return payload.isCorrect ? (
                <circle cx={cx} cy={cy} r={3} fill={"#7BC950"} />
              ) : (
                <circle cx={cx} cy={cy} r={3} fill={"#F71735"} />
              );
            }}
            stroke="#ffffff"
            strokeWidth={2}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TypingSpeedLineChart;
