import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraLayoutComponent } from './layouts/extra/extra.component';


import { PageDashboardComponent } from './pages/dashboard/dashboard.component';

import { PageNotFoundComponent } from './pages/not-found/not-found.component';

import { PageSignInComponent } from './pages/extra-pages/sign-in/sign-in.component';
import { PageSignUpComponent } from './pages/extra-pages/sign-up/sign-up.component';
import { PageForgotComponent } from './pages/extra-pages/forgot/forgot.component';
import { PageConfirmComponent } from './pages/extra-pages/confirm/confirm.component';
import { Page404Component } from './pages/extra-pages/page-404/page-404.component';
import { Page500Component } from './pages/extra-pages/page-500/page-500.component';
import { PageLayoutsComponent } from './pages/layouts/layouts.component';

//products
import { ProductComponent } from './tienda/product/product.component';
import { AddProductsComponent } from './tienda/product/add-products/add-products.component';
import { UpdateProductsComponent } from './tienda/product/update-products/update-products.component';
import { ViewProductsComponent } from './tienda/product/view-products/view-products.component';
//categories
import { CategoriesComponent } from './tienda/categories/categories.component';
import { AddCategoriesComponent } from './tienda/categories/add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './tienda/categories/update-categories/update-categories.component';
import { ViewCategoriesComponent } from './tienda/categories/view-categories/view-categories.component';
// sub-categories
import { SubCategoriesComponent } from './tienda/sub-categories/sub-categories.component';

///options
import { ColorComponent } from './tienda/options/color/color.component';
import { SizeComponent } from './tienda/options/size/size.component';
import { AddColorComponent } from './tienda/options/color/add-color/add-color.component';
import { UpdateColorComponent } from './tienda/options/color/update-color/update-color.component';
import { UpdateSizeComponent } from './tienda/options/size/update-size/update-size.component';
import { AddSizeComponent } from './tienda/options/size/add-size/add-size.component';


import { OfferComponent } from './tienda/options/offer/offer.component';
import { UpdateOfferComponent } from './tienda/options/offer/update-offer/update-offer.component';
import { AddOfferComponent } from './tienda/options/offer/add-offer/add-offer.component';

import { BrandComponent } from './tienda/options/brand/brand.component';
import { AddBrandComponent } from './tienda/options/brand/add-brand/add-brand.component';
import { UpdateBrandComponent } from './tienda/options/brand/update-brand/update-brand.component';


import { ProfileComponent } from './tienda/profile/profile.component';
import { MyProfileComponent } from './tienda/profile/my-profile/my-profile.component';

import { AllVariantsComponent } from './tienda/product/variants/all-variants/all-variants.component';
import { AddVariantComponent } from './tienda/product/variants/add-variant/add-variant.component';
import { EditVariantComponent } from './tienda/product/variants/edit-variant/edit-variant.component';
import { ViewVariantComponent } from './tienda/product/variants/view-variant/view-variant.component';

import { NotificationsComponent } from './tienda/notifications/notifications.component';

//usuario
import { UsuarioComponent } from 'app/tienda/user/usuarios/usuario.component';
import { ViewUsuarioComponent } from 'app/tienda/user/usuarios/view-usuario/view-usuario.component';
import { UpdateUsuarioComponent } from 'app/tienda/user/usuarios/update-usuario/update-usuario.component';


//cliente
import { ClientComponent } from 'app/tienda/user/cliente/client.component';
import { ViewClientComponent } from 'app/tienda/user/cliente/view-client/view-client.component';
import { UpdateClientComponent } from 'app/tienda/user/cliente/update-client/update-client.component';
import { AddUsuarioComponent } from 'app/tienda/user/usuarios/add-usuario/add-usuario.component';
import { RolUsuarioComponent } from 'app/tienda/user/usuarios/rol-usuario/rol-usuario.component';
import { UpdateRolesComponent } from './tienda/roles/update-roles/update-roles.component';
import { AddRolesComponent } from './tienda/roles/add-roles/add-roles.component';
import { RolesComponent } from './tienda/roles/roles.component';
import { JerarquiaComponent } from 'app/tienda/jerarquia/jerarquia.component';
import { ViewJerarquiaComponent } from 'app/tienda/jerarquia/view-jerarquia/view-jerarquia.component';
import { AddJerarquiaComponent } from './tienda/jerarquia/add-jerarquia/add-jerarquia.component';
import { ArchivosComponent } from './tienda/archivos/archivos.component';
import { DemoComponent } from './tienda/demo/demo.component';

import { SettingsComponent } from './tienda/settings/settings.component';
import { TaxComponent } from './tienda/settings/tax/tax.component';
import { AddTaxComponent } from './tienda/settings/tax/add-tax/add-tax.component';
import { UpdateTaxComponent } from './tienda/settings/tax/update-tax/update-tax.component';
import { OrderComponent } from './tienda/order/order.component';
import { ViewOrderComponent } from './tienda/order/view-order/view-order.component';
import { OrderEndComponent } from './tienda/order-end/order-end.component';
import { ViewOrderEndComponent } from './tienda/order-end/view-order-end/view-order-end.component';
import { ExtraComponent } from './tienda/settings/extra/extra.component';
import { AddExtraComponent } from './tienda/settings/extra/add-extra/add-extra.component';
import { UpdateExtraComponent } from './tienda/settings/extra/update-extra/update-extra.component';
import { CouponComponent } from './tienda/settings/coupon/coupon.component';
import { AddCouponComponent } from './tienda/settings/coupon/add-coupon/add-coupon.component';
import { UpdateCouponComponent } from './tienda/settings/coupon/update-coupon/update-coupon.component';
import { TiendaComponent } from './tienda/tienda/tienda.component';
import { AddTiendaComponent } from './tienda/tienda/add-tienda/add-tienda.component';
import { UpdateTiendaComponent } from './tienda/tienda/update-tienda/update-tienda.component';
import { ViewTiendaComponent } from './tienda/tienda/view-tienda/view-tienda.component';
import { AddUnidadesComponent } from './tienda/options/unit-sizes/add-unit-size/add-unit-sizes.component';
import { UnidadesComponent } from './tienda/options/unit-sizes/unit-sizes.component';
import { UpdateUnidadesComponent } from './tienda/options/unit-sizes/update-unit-size/update-unit-sizes.component';
import { ViewUnidadesComponent } from './tienda/options/unit-sizes/view-unit-sizes/view-unit-sizes.component';
import { PreferenciasComponent } from './tienda/settings/preferencias/preferencias.component';


const defaultRoutes: Routes = [
  { path: '', component: PageDashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

const boxedRoutes: Routes = [
  { path: 'layouts', component: PageLayoutsComponent }
];

const boxedvisibleRoutes: Routes = [
  { path: 'layouts', component: PageLayoutsComponent }
];

const visiblesidebarRoutes: Routes = [
  { path: 'layouts', component: PageLayoutsComponent }
];

const extraRoutes: Routes = [
  { path: 'sign-in', component: PageSignInComponent },
  { path: 'sign-up', component: PageSignUpComponent },
  { path: 'forgot', component: PageForgotComponent },
  { path: 'confirm', component: PageConfirmComponent },
  { path: 'page-404', component: Page404Component },
  { path: 'page-500', component: Page500Component },
];

const productRoutes: Routes = [
  { path: 'all', component: ProductComponent },
  { path: 'add', component: AddProductsComponent },
  { path: 'update/:id', component: UpdateProductsComponent },
  { path: 'view/:id', component: ViewProductsComponent },

  { path: 'variants/all/:idProducto/:idUnidad', component: AllVariantsComponent },
  { path: 'variants/add/:idProducto/:idUnidad', component: AddVariantComponent },
  { path: 'variants/update/:id/:index/:idUnidad', component: EditVariantComponent },
  { path: 'variants/view/:id/:idUnidad', component: ViewVariantComponent },
];

const categoriesRoutes: Routes = [
  { path: 'all', component: CategoriesComponent },
  { path: 'add', component: AddCategoriesComponent },
  { path: 'update/:id', component: UpdateCategoriesComponent },
  { path: 'view/:id', component: ViewCategoriesComponent },
  { path: 'sub-categories/:id', component: SubCategoriesComponent }

];

const tiendaRoutes: Routes = [
  { path: 'all', component: TiendaComponent },
  { path: 'add', component: AddTiendaComponent },
  { path: 'update/:id', component: UpdateTiendaComponent },
  { path: 'view/:id', component: ViewTiendaComponent }

];

const subCategoryRoutes: Routes = [
  { path: 'sub-categories/:id', component: SubCategoriesComponent }
];

const rolesRoutes: Routes = [
  { path: 'all', component: RolesComponent },
  { path: 'add', component: AddRolesComponent },
  { path: 'update/:id', component: UpdateRolesComponent },

];

const orderRoutes: Routes = [
  { path: 'all', component: OrderComponent },
  { path: 'view/:id', component: ViewOrderComponent },
  { path: 'all-end', component: OrderEndComponent },
  { path: 'view-end/:id', component: ViewOrderEndComponent },
];

const profileRoutes: Routes = [
  { path: 'setting', component: ProfileComponent },
  { path: 'my-profile', component: MyProfileComponent },
];

const settingRoutes: Routes = [
  { path: 'coupon', component: CouponComponent },
	{ path: 'add-coupon', component: AddCouponComponent },
  { path: 'update-coupon/:id', component: UpdateCouponComponent },

	{ path: 'tax', component: TaxComponent },
  { path: 'add-tax', component: AddTaxComponent },
  { path: 'update-tax/:id', component: UpdateTaxComponent },

  { path: 'extra', component: ExtraComponent },
  { path: 'add-extra', component: AddExtraComponent },
  { path: 'update-extra/:id', component: UpdateExtraComponent },

  { path: 'preferencias', component: PreferenciasComponent },


];

const optionsRoutes: Routes = [
  { path: 'color', component: ColorComponent },
  { path: 'add-color', component: AddColorComponent },
  { path: 'update-color/:id', component: UpdateColorComponent },

  { path: 'size/:idUnidad', component: SizeComponent },
  { path: 'add-size/:idUnidad', component: AddSizeComponent },
  { path: 'update-size/:idUnidad/:id', component: UpdateSizeComponent },

  { path: 'unit-size', component: UnidadesComponent },
  { path: 'add-unit-size', component: AddUnidadesComponent },
  { path: 'update-unit-size/:id', component: UpdateUnidadesComponent },
  { path: 'view-unit-size/:id', component: ViewUnidadesComponent },

  { path: 'coupon', component: CouponComponent },
  { path: 'add-coupon', component: AddCouponComponent },
  { path: 'update-coupon/:id', component: UpdateCouponComponent },

  { path: 'offer', component: OfferComponent },
  { path: 'add-offer', component: AddOfferComponent },
  { path: 'update-offer/:id', component: UpdateOfferComponent },

  { path: 'brand', component: BrandComponent },
  { path: 'add-brand', component: AddBrandComponent },
  { path: 'update-brand/:id', component: UpdateBrandComponent },

];

const userRoutes: Routes = [
  { path: 'usuario/all', component: UsuarioComponent },
  { path: 'usuario/add', component: AddUsuarioComponent },
  { path: 'view-usuario/:id', component: ViewUsuarioComponent },
  { path: 'update-usuario/:id', component: UpdateUsuarioComponent },
  { path: 'rol-usuario/:id', component: RolUsuarioComponent},

  { path: 'client/all', component: ClientComponent },
  { path: 'view-client/:id', component: ViewClientComponent },
  { path: 'update-client/:id', component: UpdateClientComponent },

];

const equipoRoutes: Routes = [
  { path: 'jerarquia/all', component: JerarquiaComponent},
  { path: 'jerarquia/:id', component: JerarquiaComponent},
  { path: 'view-jerarquia/:rol/:id/:idRol', component: ViewJerarquiaComponent },
  { path: 'add-jerarquia/:rol/:id/:idRol', component: AddJerarquiaComponent }
];

const archivoRoutes: Routes = [
  { path: 'productos', component: ArchivosComponent}
];


const demoRoutes: Routes = [
  { path: 'demo', component: DemoComponent },
];

const otherRoutes: Routes = [
  { path: 'notifications', component: NotificationsComponent },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/pages/sign-in',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DefaultLayoutComponent,
    children: defaultRoutes
  },
  {
    path: 'pages',
    component: ExtraLayoutComponent,
    children: extraRoutes
  },
  {
    path: 'products',
    component: DefaultLayoutComponent,
    children: productRoutes
  },
  {
    path: 'categories',
    component: DefaultLayoutComponent,
    children: categoriesRoutes
  },
  {
    path: 'tienda',
    component: DefaultLayoutComponent,
    children: tiendaRoutes
  },
  {
    path: 'sub-categories',
    component: DefaultLayoutComponent,
    children: subCategoryRoutes
  },
  {
    path: 'orders',
    component: DefaultLayoutComponent,
    children: orderRoutes
  },
  {
    path: 'roles',
    component: DefaultLayoutComponent,
    children: rolesRoutes
  },
  {
    path: 'users',
    component: DefaultLayoutComponent,
    children: userRoutes
  },
  {
    path: 'equipo',
    component: DefaultLayoutComponent,
    children: equipoRoutes
  },
  {
    path: 'options',
    component: DefaultLayoutComponent,
    children: optionsRoutes
  },
  {
		path: 'setting',
		component: DefaultLayoutComponent,
		children: settingRoutes
	},
  {
    path: 'other',
    component: DefaultLayoutComponent,
    children: otherRoutes
  },
  {
    path: 'profile',
    component: DefaultLayoutComponent,
    children: profileRoutes
  },
  {
    path: 'archivos',
    component: DefaultLayoutComponent,
    children: archivoRoutes
  },
  {
    path: 'demo',
    component: DefaultLayoutComponent,
    children: demoRoutes
  },
  {
    path: '**',
    component: ExtraLayoutComponent,
    children: extraRoutes
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
