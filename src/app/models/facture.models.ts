export interface Facture{
    id :number;
    date: Date; 
    montantTotal: number; 
    paiementMode: "espéce";   
    paiementStatus: boolean;

}