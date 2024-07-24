"use client";

import Image from "next/image";
import NavBar from "@/components/dashboard/dashboardNav";
import DashBoard from "@/components/dashboard/parentDash";
import OrderCard from "@/components/dashboard/orders";
import Charts from "@/components/dashboard/charts";

export default function Home() {
  return (
    <>
    <NavBar/>
    <DashBoard/>
    <Charts/>
    
    <OrderCard/>
    </>
  );
}
