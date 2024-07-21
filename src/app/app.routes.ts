import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddProductComponent } from './components/products/add/add-product.component';
import { ProductListComponent } from './components/products/list/list-products.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    { path:'', component: LoginComponent},
    { path:'login', component: LoginComponent},
    { path:'register', component: RegisterComponent},
    { path:'admin', component: AdminComponent,
        children:[
            { path:'', component: DashboardComponent},
            { path:'dashboard', component: DashboardComponent},
            { path:'add-product', component: AddProductComponent},
            { path:'product-list', component: ProductListComponent}

        ]
    }
];
