import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';

const appRoutes: Routes =[
  {
    path: '',
    component: MainPageComponent 
  },
 
]
@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
