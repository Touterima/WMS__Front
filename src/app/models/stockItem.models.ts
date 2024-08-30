import { Produits } from "./product.models";
import { Stock } from "./stock.models";

export interface StockItem {
    id: number;
    stock: Stock;
    produit: Produits; // Assuming Produit is another interface or class
    quantity: number;
}