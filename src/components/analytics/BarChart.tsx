"use client";

import { useMemo } from "react";
import { type AxisOptions, type UserSerie, Chart } from "react-charts";
import { useTheme } from "next-themes";

type MyDatum = { version: string; amount: number };

export default function BarChart({
  analyticsData,
}: {
  analyticsData: Record<string, Record<string, number>>;
}) {
  // Get the theme
  const { resolvedTheme } = useTheme();

  // Define the data
  const data = useMemo(
    (): UserSerie<MyDatum>[] =>
      Object.entries(analyticsData).map(([title, rawData]) => ({
        title,
        data: Object.entries(rawData).map(([version, amount]) => ({
          version,
          amount,
        })),
      })),
    [analyticsData],
  );

  // Define the primary axis
  const primaryAxis = useMemo(
    (): AxisOptions<MyDatum> => ({
      getValue: (datum) => datum.version,
    }),
    [],
  );

  // Define the secondary axes
  const secondaryAxes = useMemo(
    (): AxisOptions<MyDatum>[] => [
      {
        getValue: (datum) => datum.amount,
        elementType: "bar",
      },
    ],
    [],
  );

  // If the data is empty, return a message.
  if (data.length === 0) return <p className="text-lg">No data available!</p>;

  return (
    <Chart
      options={{
        data,
        primaryAxis,
        secondaryAxes,
        dark: resolvedTheme === "dark",
      }}
    />
  );
}
