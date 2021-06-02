export interface Category {
  name: string;
  status: number;
  display_order: number;
}

export interface ProductCategory {
  id: number;
  name: string;
  status: number;
  display_order: number;
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  status: number;
  image: string;
  price: number;
  description: string;
  category_id: number;
  display_order: number;
  configurations: Configuration[];
}

export interface Configuration {
  id: number;
  name: string;
  sub_configuration: string;
  extra_price: number;
  config_display_order: number;
  sub_config_display_order: number;
  stock: number;
}
