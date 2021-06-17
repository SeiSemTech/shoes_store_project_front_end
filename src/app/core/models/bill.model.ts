export interface BillDescription {
  id: number;
  id_user: number;
  date: Date;
  total_quantity: number;
  total_price: number;
  status: string;
}

export interface OrderBillDescription {
  id_bill: number;
  product_name: string;
  quantity: number;
  price: number;
  date: Date;
  status: string;
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

export interface BillStatus {
  id: number;
  status: string;
}
