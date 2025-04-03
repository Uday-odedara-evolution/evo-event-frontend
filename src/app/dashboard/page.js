import DashboardView from "./components/dashboard_view/DashboardView";

export const metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <div className="flex h-full">
      <DashboardView />
    </div>
  );
}
