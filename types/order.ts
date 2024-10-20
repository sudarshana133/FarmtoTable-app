import { Crop } from "./crop";

export interface OrderItem {
    _id: string;
    crop: Crop;
    quantity: number;
    price: number;
}
export interface Order {
    _id: string;
    farmerUsername: string;
    customerUsername: string;
    OrderPlaceTime: Date;
    items: OrderItem[];
    totalPrice: number;
    pending: boolean;
    paymentStatus: "Pending" | "Completed";
    approved: boolean;
}