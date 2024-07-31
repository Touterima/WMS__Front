import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/products/add/add-product.component';
import { ProductListComponent } from './components/products/list/list-products.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { EditComponent } from './components/products/edit/edit.component';
import { SearchProductComponent } from './components/Transactions/search/searchProduc.component';
import { TransactionListComponent } from './components/Transactions/list/list-transaction.component';
import { UserListComponent } from './components/user/list/user-list.component';
import { PasserTransactionsComponent } from './components/Transactions/passer-transactions/passer-transaction.component';

export const routes: Routes = [
    { path:'', component: LoginComponent},
    { path:'login', component: LoginComponent},
    { path:'register', component: RegisterComponent},
    { path:'admin', component: AdminComponent,
        children:[
            { path:'', component: DashboardComponent},
            { path:'dashboard', component: DashboardComponent},
            { path:'add-product', component: AddProductComponent},
            { path:'product-list', component: ProductListComponent},
            { path:'editProduct/:id', component: EditComponent},
            { path:'add-transaction', component: SearchProductComponent},
            { path:'transaction-list', component: TransactionListComponent},
            { path:'users', component: UserListComponent},
            { path:'passer-transaction', component: PasserTransactionsComponent}
       

        ]
    }
];
