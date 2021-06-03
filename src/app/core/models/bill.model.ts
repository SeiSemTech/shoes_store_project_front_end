export interface BillDescription {
  id_product_config: number;
  name: string;
  date: string;
  quantity: number;
  price: number;
}

export interface OrderBillDescription {
  id_bill: number;
  product_name: string;
  quantity: number;
  price: number;
  date: Date;
}

export interface Bill {
  id_product_config: number;
  quantity: number;
  price: number;
}


export interface BillCustomerOrder {
  order: any;
}


export interface BillEmail {
  product_name: number;
  quantity: number;
  price: number;
}
