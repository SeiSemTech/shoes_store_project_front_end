export interface BillDescription {
  id_product_config: number;
  name: string;
  date: string;
  quantity: number;
  price: number;
}

export interface Bill {
  id_product_config: number;
  quantity: number;
  price: number;
}

export interface BillCustomerOrder {
  order: any;
}
