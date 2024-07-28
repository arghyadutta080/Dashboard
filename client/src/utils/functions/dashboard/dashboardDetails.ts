import { getAllOrders } from "@/api/dashboard/order/ordersInfo";
import { getAllProducts } from "@/api/dashboard/product/productsInfo";
import { getAllSells } from "@/api/dashboard/sells/sellsInfo";


export const getSells = async () => {
    const response = await getAllSells();
    return response?.length;
}

export const getOrders = async () => {
    const response = await getAllOrders();
    return response?.length;
}

export const getProducts = async () => {
    const response = await getAllProducts();
    return response?.total_quantity;
}
