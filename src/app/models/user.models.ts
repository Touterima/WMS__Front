export interface User {
    id: number;
    email: string;
    password: string;
    code: string;
    societe: string;
    adresse: string;
    mf: string;
    tel: string;
    fax: string;
    mob: string;
    secteur: string;
    ville: string;
    classeCompt: string;
    devise: string;
    role: any;
    status: any;
  }
/*
  export enum UStatus {
    Blocked,
    Pending,
    Active
  }
  export enum Role {
    USER,
    AGENT,
    ADMIN
  }
    */