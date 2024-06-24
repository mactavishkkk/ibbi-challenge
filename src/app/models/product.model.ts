export interface Product {
    id: number;
    name: string;
    description: string;
    value: number;
    dolarValue: number;
    quantity: number;
    status: string;
    image: string;
    category_id: number;
    file: File;
}

export interface ProductCreateDTO {
    name: string;
    description: string;
    value: number;
    dolarValue: number;
    quantity: number;
    status: string;
    image: string;
    category_id: number;
}