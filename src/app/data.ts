
export interface login {
  email: String;
  password: String;
}

export interface product {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}
export interface cart {
  name: string;
  price: number;
  image: string;
  description: string;
  id: number | undefined;
  quantity: undefined | number;
  productId: number;
  userId: number;
}

export interface getTotal {
  price: number;
  total: number;
}
