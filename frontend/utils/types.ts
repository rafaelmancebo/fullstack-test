export type Address = {
    id: number;
    address: string;
    province: string;
    userId: number;
};

export type User = {
    id: number;
    name: string;
    email: string;
    Address: Address[];
};
