
// import NavBar from "@/components/dashboard/DashboardNav";
// import DashBoard from "@/components/dashboard/parentDash";
// import OrderCard from "@/components/dashboard/Orders";
// import Charts from "@/components/dashboard/Charts";

import Charts from "@/components/dashboard/Charts";
import Navbar from "@/components/dashboard/DashboardNav";
import RevealCards from "@/components/dashboard/Orders";
import Dashboard from "@/components/dashboard/ParentDashboard";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Dashboard/>
    <Charts/>
    
    <RevealCards/>
    </>
  );
}
