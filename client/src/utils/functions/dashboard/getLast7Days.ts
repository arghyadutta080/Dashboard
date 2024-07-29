import { getDateWiseSell } from "@/api/dashboard/sells/sellsInfo";
import { SalesData } from "@/lib/types/dashboard/sales";

const last7Days = () => {
    const last7Days = [];
    const today = new Date();
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const day = date.toISOString().split('T')[0];
        last7Days.push(day);
    }
    return last7Days;
}

export const getWeeklySalesData = async () => {
    const weeklySalesData = await getDateWiseSell();
    let sales: SalesData[]
    const DatesOfWeek = last7Days();
    if (weeklySalesData) {
        sales = DatesOfWeek.map((date) => {
            const saleData = weeklySalesData.find((data: SalesData) => data?.date == date)
            return { date, sales: saleData?.total_sell || 0 }
        })
        // console.log(sales);
        return sales;
    }
    return sales = DatesOfWeek.map((date) => {
        return { date, sales: 0 }
    })
}