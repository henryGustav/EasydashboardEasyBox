import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, Http } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from 'ng2-select';
import { MaterialModule } from '@angular/material';
import { DataTableModule, DataTable } from 'angular2-datatable';
import { DataTablesModule } from 'angular-datatables';
import { ChartsModule } from 'ng2-charts';
import { CalendarModule } from 'angular-calendar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ToastrModule } from 'toastr-ng2';
import { ColorPickerModule } from 'ngx-color-picker';
import { CookieModule } from 'ngx-cookie';

//import { AgmCoreModule }                    from 'angular2-google-maps/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { DefaultLayoutComponent } from './layouts/default/default.component';
import { ExtraLayoutComponent } from './layouts/extra/extra.component';

//A2 Components
import { NavbarComponent } from './ni-components/navbar/navbar.component';
import { SidebarComponent } from './ni-components/sidebar/sidebar.component';
import { LogoComponent } from './ni-components/logo/logo.component';
import { MainMenuComponent } from './ni-components/main-menu/main-menu.component';
import { A2CardComponent } from './ni-components/card/card.component';
import { AlertComponent } from './ni-components/alert/alert.component';
import { BadgeComponent } from './ni-components/badge/badge.component';
import { BreadcrumbComponent } from './ni-components/breadcrumb/breadcrumb.component';
import { FileComponent } from './ni-components/file/file.component';
import { FooterComponent } from './ni-components/footer/footer.component';

//A2 Pages

import { PageDashboardComponent } from './pages/dashboard/dashboard.component';
import { PageNotFoundComponent } from './pages/not-found/not-found.component';
import { PageLayoutsComponent } from './pages/layouts/layouts.component';

//Extra pages
import { PageSignInComponent } from './pages/extra-pages/sign-in/sign-in.component';
import { PageSignUpComponent } from './pages/extra-pages/sign-up/sign-up.component';
import { PageForgotComponent } from './pages/extra-pages/forgot/forgot.component';
import { PageConfirmComponent } from './pages/extra-pages/confirm/confirm.component';
import { Page404Component } from './pages/extra-pages/page-404/page-404.component';
import { Page500Component } from './pages/extra-pages/page-500/page-500.component';
import { ProductComponent } from './tienda/product/product.component';
import { CategoriesComponent } from './tienda/categories/categories.component';
import { RolesComponent } from './tienda/roles/roles.component';
import { ProfileComponent } from './tienda/profile/profile.component';
import { AddProductsComponent } from './tienda/product/add-products/add-products.component';
import { UpdateProductsComponent } from './tienda/product/update-products/update-products.component';
import { ViewProductsComponent } from './tienda/product/view-products/view-products.component';
import { AddCategoriesComponent } from './tienda/categories/add-categories/add-categories.component';
import { UpdateCategoriesComponent } from './tienda/categories/update-categories/update-categories.component';
import { ViewCategoriesComponent } from './tienda/categories/view-categories/view-categories.component';
import { AddRolesComponent } from './tienda/roles/add-roles/add-roles.component';
import { UpdateRolesComponent } from './tienda/roles/update-roles/update-roles.component';

//users pages
//usuarios
import { UsuarioComponent } from 'app/tienda/user/usuarios/usuario.component';
import { AddUsuarioComponent } from 'app/tienda/user/usuarios/add-usuario/add-usuario.component';
import { ViewUsuarioComponent } from 'app/tienda/user/usuarios/view-usuario/view-usuario.component';
import { UpdateUsuarioComponent } from 'app/tienda/user/usuarios/update-usuario/update-usuario.component';

//cliente
import { ClientComponent } from 'app/tienda/user/cliente/client.component';
import { ViewClientComponent } from 'app/tienda/user/cliente/view-client/view-client.component';
import { UpdateClientComponent } from 'app/tienda/user/cliente/update-client/update-client.component';

// project Imports
import { ConstantService } from './constant.service';
import { CrudService } from './tienda/services/crud.service';
import { CrudBaseService } from './tienda/services/base.service';
import { SocketSharedService } from './SocketShare.service';
// services end
import { SubCategoriesComponent } from './tienda/sub-categories/sub-categories.component';
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

import { FileUploadModule } from 'ng2-file-upload';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
//import {colorpicker} from 'angular-bootstrap-colorpicker';
//import {ColorPickerModule} from 'angular2-color-picker';

import { CKEditorModule } from 'ng2-ckeditor';
import { AllVariantsComponent } from './tienda/product/variants/all-variants/all-variants.component';
import { AddVariantComponent } from './tienda/product/variants/add-variant/add-variant.component';
import { EditVariantComponent } from './tienda/product/variants/edit-variant/edit-variant.component';
import { ViewVariantComponent } from './tienda/product/variants/view-variant/view-variant.component';
import { MyProfileComponent } from './tienda/profile/my-profile/my-profile.component';
import { NotificationsComponent } from './tienda/notifications/notifications.component';

//directives
import { UppercaseDirective } from './directives/uppercase.directive';

//para manejo de fechas
import { CalendarModule as datetime } from 'primeng/primeng';
import { DatePipe } from '@angular/common';
import { UsuarioService } from 'app/tienda/user/usuarios/usuario.service';
import { RolUsuarioComponent } from './tienda/user/usuarios/rol-usuario/rol-usuario.component';
import { JerarquiaComponent } from './tienda/jerarquia/jerarquia.component';
import { ViewJerarquiaComponent } from './tienda/jerarquia/view-jerarquia/view-jerarquia.component';
import { RolService } from './tienda/user/usuarios/rol-usuario/rol.service';
import { AddJerarquiaComponent } from './tienda/jerarquia/add-jerarquia/add-jerarquia.component';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor } from 'app/interceptores/token-interceptor';
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
import { AddTiendaComponent } from './tienda/tienda/add-tienda/add-tienda.component';
import { UpdateTiendaComponent } from './tienda/tienda/update-tienda/update-tienda.component';
import { ViewTiendaComponent } from './tienda/tienda/view-tienda/view-tienda.component';
import { TiendaComponent } from './tienda/tienda/tienda.component';
import { UpdateUnidadesComponent } from './tienda/options/unit-sizes/update-unit-size/update-unit-sizes.component';
import { AddUnidadesComponent } from './tienda/options/unit-sizes/add-unit-size/add-unit-sizes.component';
import { ViewUnidadesComponent } from './tienda/options/unit-sizes/view-unit-sizes/view-unit-sizes.component';
import { UnidadesComponent } from './tienda/options/unit-sizes/unit-sizes.component';
import { PreferenciasComponent } from './tienda/settings/preferencias/preferencias.component';

@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ChartsModule,
    SelectModule,
    DataTableModule,
    DataTablesModule,
    datetime,

    CalendarModule.forRoot(),
    ToastrModule.forRoot(),
    NgxDatatableModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyAU9f7luK3J31nurL-Io3taRKF7w9BItQE'
    // }),
    FileUploadModule,
    Ng2CloudinaryModule,
    CKEditorModule,
    ColorPickerModule,
    
    CookieModule.forRoot()

  ],
  declarations: [
    AppComponent,
    DefaultLayoutComponent,
    ExtraLayoutComponent,
    NavbarComponent,
    SidebarComponent,
    LogoComponent,
    MainMenuComponent,
    A2CardComponent,
    AlertComponent,
    BadgeComponent,
    BreadcrumbComponent,
    FileComponent,
    FooterComponent,
    PreferenciasComponent,
    PageDashboardComponent,
    PageNotFoundComponent,
    PageSignInComponent,
    PageSignUpComponent,
    PageForgotComponent,
    PageConfirmComponent,
    Page404Component,
    Page500Component,
    PageLayoutsComponent,
    ProductComponent,
    CategoriesComponent,
    RolesComponent,
    ProfileComponent,
    AddProductsComponent,
    UpdateProductsComponent,
    ViewProductsComponent,
    AddCategoriesComponent,
    UpdateCategoriesComponent,
    ViewCategoriesComponent,
    TiendaComponent,
    AddTiendaComponent,
    UpdateTiendaComponent,
    ViewTiendaComponent,
    SubCategoriesComponent,
    AddRolesComponent,
    UpdateRolesComponent,
    ColorComponent,
    SizeComponent,
    AddColorComponent,
    UpdateColorComponent,
    UpdateSizeComponent,
    AddSizeComponent,
    CouponComponent,
    AddCouponComponent,
    UpdateCouponComponent,
    OfferComponent,
    UpdateOfferComponent,
    AddOfferComponent,
    BrandComponent,
    OrderComponent,
    ViewOrderComponent,
    OrderEndComponent,
    ViewOrderEndComponent,
    AddBrandComponent,
    UpdateBrandComponent,

    UnidadesComponent,
    ViewUnidadesComponent,
    UpdateUnidadesComponent,
    AddUnidadesComponent,

    ClientComponent,
    UpdateClientComponent,
    ViewClientComponent,

    UsuarioComponent,
    AddUsuarioComponent,
    ViewUsuarioComponent,
    UpdateUsuarioComponent,

    AllVariantsComponent,
    AddVariantComponent,
    EditVariantComponent,
    ViewVariantComponent,
    MyProfileComponent,
    NotificationsComponent,

    UppercaseDirective,

    RolUsuarioComponent,

    JerarquiaComponent,
    ViewJerarquiaComponent,
    AddJerarquiaComponent,
    ArchivosComponent,
    SettingsComponent,
    TaxComponent,
    AddTaxComponent,
    UpdateTaxComponent,
    ExtraComponent,
    AddExtraComponent,
    UpdateExtraComponent,
    DemoComponent
  ],
  entryComponents: [],
  providers: [

    ConstantService, SocketSharedService, CrudBaseService, CrudService, DatePipe, RolService,    DataTable,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}
