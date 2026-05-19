import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RestaurantComponent } from './component/restaurant/restaurant.component';
import { MenuItemComponent } from './component/menu-item/menu-item.component';
import { OrderComponent } from './component/order/order.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AssignmanagerComponent } from './component/assignmanager/assignmanager.component';
import { FeedbackComponent } from './component/feedback/feedback.component';
import { CustomerdetailsComponent } from './component/customerdetails/customerdetails.component';
import { LoginComponent } from './auth/login/login.component';

import { FilterRestaurantsPipe } from './filter-restaurants.pipe';
import { FilterOrdersPipe } from './filter-orders.pipe';
import { FilterMenuItemsPipe } from './filter-menu-items.pipe';

import { JwtInterceptor } from './auth.interceptors';

// Standalone component
import { LandingpageComponent } from './landingpage/landingpage';
// import { FloatingChatbotComponent } from './component/chat-bot/chatbot.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RestaurantComponent,
    MenuItemComponent,
    OrderComponent,
    DashboardComponent,
    AssignmanagerComponent,
    FeedbackComponent,
    CustomerdetailsComponent,
    FilterRestaurantsPipe,
    FilterOrdersPipe,
    FilterMenuItemsPipe,
    LoginComponent
    // FloatingChatbotComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    // Because LandingpageComponent is standalone, import it here
    LandingpageComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}