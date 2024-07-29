import { Produits } from "./product.models";

export interface Transaction {
    id: number;
    produits: Produits; // You might want to create a separate Produits interface
    quantity: number;
    montant: number;
    details: string;
  }