import { BarChartMultiple } from "../components/dashboard/bar-chart";

const Dashboard = () => {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <BarChartMultiple />
      </div>
    </div>
  );
};

export { Dashboard };
