import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { ForumComponent } from './Views/forum/forum.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Views/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { QuestionsListComponent } from './Components/questions-list/questions-list.component';
import { RightSectionComponent } from './Components/right-section/right-section.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path:'', redirectTo:'/home', pathMatch:'full'},
  { path:'forum', component: ForumComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    ForumComponent,
    HomeComponent,
    NavbarComponent,
    SidebarComponent,
    QuestionsListComponent,
    RightSectionComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
