import { Transaction } from "./transaction.models";

export interface Bon {
    id: number;
    type: string;
    transactions: Transaction[];
    receiver: any; // You might want to create a separate User interface
    sender: any; 
    date: Date;
    status: boolean;
  }