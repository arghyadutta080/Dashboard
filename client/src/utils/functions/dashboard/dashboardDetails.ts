import { getAllOrders } from "@/api/dashboard/order/ordersInfo";
import { getAllProducts } from "@/api/dashboard/product/productsInfo";
import { getAllSells, getTop5Products } from "@/api/dashboard/sells/sellsInfo";
import { ProductData } from "@/lib/types/dashboard/product";
import { getDateWiseSell } from "@/api/dashboard/sells/sellsInfo";
import { SalesData } from "@/lib/types/dashboard/sales";
import { makeToast } from "../common/makeToast";
import { last7Days } from "./getLast7Days";


export const getSells = async () => {
    const response = await getAllSells();
    if(response?.detail) {
        makeToast(400, response?.detail);
        return response.detail;
    }
    return response;
}

export const getOrders = async () => {
    const response = await getAllOrders();
    if (response?.detail) {
        makeToast(400, response?.detail);
        return response.detail;
    }
    return response?.length;
}

export const getProducts = async () => {
    const response = await getAllProducts();
    if (response?.detail) {
        makeToast(400, response?.detail);
        return response.detail;
    }
    return response?.total_quantity;
}

export const getWeeklySalesData = async () => {
    const weeklySalesData = await getDateWiseSell();
    if (weeklySalesData?.detail) {
        makeToast(400, weeklySalesData?.detail);
        return;
    }
    let sales: SalesData[]
    const DatesOfWeek = last7Days();
    if (weeklySalesData) {
        sales = DatesOfWeek.map((date) => {
            const saleData = weeklySalesData.find((data: SalesData) => data?.date == date)
            return { date, sales: saleData?.total_sell || 0 }
        })

        return sales;
    }
    return sales = DatesOfWeek.map((date) => {
        return { date, sales: 0 }
    })
}

export const getTopProducts = async () => {
    const products = await getTop5Products();
    if (products?.detail) {
        makeToast(400, products?.detail);
        return;
    }
    const response: ProductData[] = products.map((product: any) => {
        return { name: product?.product_name, sales: product?.total_sell }
    })
    return response;
}
