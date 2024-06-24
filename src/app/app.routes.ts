import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { CategoryListComponent } from './components/category-list/category-list.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { CategoryCreateComponent } from './components/category-create/category-create.component';
import { CategoryEditComponent } from './components/category-edit/category-edit.component';
import { ProductCreateComponent } from './components/product-create/product-create.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

    { path: 'categories', component: CategoryListComponent, canActivate: [AuthGuard] },
    { path: 'categories/create', component: CategoryCreateComponent },
    { path: 'categories/edit/:id', component: CategoryEditComponent },

    { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
    { path: 'products/create', component: ProductCreateComponent },
];
