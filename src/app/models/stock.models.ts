import { Produits } from "./product.models";
import { StockItem } from "./stockItem.models";

export interface Stock {
    id?: number;
    name: string;
    details: string;
    stockItems: StockItem[];
  }