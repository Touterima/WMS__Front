import { Produits } from "./product.models";

export interface Stock {
    id?: number;
    name: string;
    details: string;
    products: Produits[];
  }