import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxOtpInputModule } from 'ngx-otp-input';
import { AgmCoreModule } from '@agm/core';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FoodresultsComponent } from './foodresults/foodresults.component';
import { MapresultsComponent } from './mapresults/mapresults.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { ProfileComponent } from './profile/profile.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { PricingComponent } from './pricing/pricing.component';
import { ContactComponent } from './contact/contact.component';
import { UserprofileComponent } from './userprofile/userprofile.component';
import { RegistrationComponent } from './registration/registration.component';


@NgModule({
  declarations: [
    DashboardCompComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    FoodresultsComponent,
    MapresultsComponent,
    RestaurantsComponent,
    ProfileComponent,
    CheckoutComponent,
    PricingComponent,
    ContactComponent,
    UserprofileComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxOtpInputModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAyT52XFVgpWCphXSqdq9zReFhf2jXBE5o'
    })
  ]
})
export class DashboardModule { }
