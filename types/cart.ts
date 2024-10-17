import { Crop } from "./crop";

export interface Item {
    _id: string;
    crop: Crop;
    quantity: number;
    price: number;
}
export interface Cart {
    _id: string;
    customerUsername: string;
    farmerUsername: string;
    items: Item[];
    totalPrice: number;
    createdAt: Date;
}
