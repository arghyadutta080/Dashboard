import { getAllOrders } from "@/api/dashboard/order/ordersInfo";
import { getAllProducts } from "@/api/dashboard/product/productsInfo";
import { getAllSells, getTop5Products } from "@/api/dashboard/sells/sellsInfo";
import { ProductData } from "@/lib/types/dashboard/product";


export const getSells = async () => {
    const response = await getAllSells();
    return response;
}

export const getOrders = async () => {
    const response = await getAllOrders();
    return response?.length;
}

export const getProducts = async () => {
    const response = await getAllProducts();
    return response?.total_quantity;
}

export const getTopProducts = async () => {
    const products = await getTop5Products();
    const response: ProductData[] = products.map((product: any) => {
        return { name: product?.product_name, sales: product?.total_sell }
    })
    return response;
}
