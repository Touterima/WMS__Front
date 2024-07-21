export interface Produits {
   // id: number;
    id?: number;  // L'ID est optionnel
    refArt: string;
    designation: string;
    collection: string;
    famille: string;
    fournisseur: string;
    refFourn: string;
    qte: number;
    unite: string;
    tva: number;
    prixAchat: number;
    prixVente: number;
    prixTtc: number;
  }