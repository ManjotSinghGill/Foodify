import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckoutComponent } from './checkout/checkout.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardCompComponent } from './dashboard-comp/dashboard-comp.component';
import { FoodresultsComponent } from './foodresults/foodresults.component';
import { HomeComponent } from './home/home.component';
import { MapresultsComponent } from './mapresults/mapresults.component';
import { PricingComponent } from './pricing/pricing.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { RestaurantsComponent } from './restaurants/restaurants.component';
import { SubmitComponent } from './submit/submit.component';
import { UserprofileComponent } from './userprofile/userprofile.component';

const routes: Routes = [
  {path: "", component: DashboardCompComponent, 
  children: [
    {path: "", component: HomeComponent},
    {path: "home", component: HomeComponent},
    {path: "foodresults", component: FoodresultsComponent},
    {path: "mapresults", component: MapresultsComponent},
    {path: "restaurants", component: RestaurantsComponent},
    {path: "profile", component: ProfileComponent},
    {path: "checkout", component: CheckoutComponent},
    {path: "pricing", component: PricingComponent},
    {path: "submit", component: SubmitComponent},
    {path: "contact", component: ContactComponent},
    {path: "userprofile", component: UserprofileComponent},
    {path: "registration", component: RegistrationComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
