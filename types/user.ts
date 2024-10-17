enum UserType {
    Farmer = "farmer",
    Customer = "customer",
}

interface User {
    _id: string;
    address: string;
    contactNum: number;
    isVerified: boolean;
    name: string;
    type: UserType;
    username: string;
}