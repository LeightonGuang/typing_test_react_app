"use client";

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
import { cssToHsl, hslToHex } from "@/utils/hslConverter";

interface Props {
  wpmData: { typedWord: string; wpm: number; isCorrect: boolean }[];
}

const TypingSpeedLineChart = ({ wpmData }: Props) => {
  const primaryHex = hslToHex(cssToHsl("--primary"));
  const borderHex = hslToHex(cssToHsl("--border"));
  const destructiveHex = hslToHex(cssToHsl("--destructive"));
  const foregroundHex = hslToHex(cssToHsl("--foreground"));
  const backgroundHex = hslToHex(cssToHsl("--background"));
  const mutedForegroundHex = hslToHex(cssToHsl("--muted-foreground"));

  return (
    <ResponsiveContainer width={"100%"} height={"100%"}>
      <LineChart
        data={wpmData}
        margin={{ top: 16, right: 32, left: 16, bottom: 4 }}
      >
        <XAxis
          dataKey={"typedWord"}
          stroke={primaryHex}
          tick={{ fill: mutedForegroundHex }}
          strokeWidth={2}
        />
        <YAxis
          dataKey={"wpm"}
          stroke={primaryHex}
          tick={{ fill: mutedForegroundHex }}
          strokeWidth={2}
        />
        <CartesianGrid strokeDasharray="3 3" stroke={borderHex} />
        <Tooltip
          contentStyle={{
            backgroundColor: backgroundHex,
            border: borderHex,
          }}
        />
        <Legend />
        <Line
          type={"monotone"}
          dataKey={"wpm"}
          dot={({ cx, cy, payload }) => {
            return payload.isCorrect ? (
              <circle
                key={payload.typedWord + payload.wpm}
                cx={cx}
                cy={cy}
                r={3}
                fill={foregroundHex}
              />
            ) : (
              <circle
                key={payload.typedWord + payload.wpm}
                cx={cx}
                cy={cy}
                r={3}
                fill={destructiveHex}
              />
            );
          }}
          stroke={mutedForegroundHex}
          strokeWidth={2}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default TypingSpeedLineChart;
