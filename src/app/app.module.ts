import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { ForumComponent } from './Views/forum/forum.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Views/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path:'', redirectTo:'/home', pathMatch:'full'},
  { path:'forum', component: ForumComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
