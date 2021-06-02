export interface Configuration {
  name: string;
  sub_configuration: string | number;
  extra_price: number;
}

export interface ConfigurationWithStock extends Configuration {
  stock: number;
  configuration: any;
}


export interface CompleteConfiguration {
  id: number;
  name: string;
  sub_configuration: string;
  extra_price: number;
  config_display_order: number;
  sub_config_display_order: number;
  stock: number;
}

export interface NamedCompleteConfiguration {
  name: string;
  configuration?: Configuration[];
}
