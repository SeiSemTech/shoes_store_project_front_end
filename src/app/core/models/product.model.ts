import {Configuration} from 'src/app/core/models/configuration.model';

export interface Product {
  name: string;
  status: number;
  image: string;
  price: number;
  description: string;
  category_id: number;
  display_order: number;
}

export interface ConfiguredProduct {
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
