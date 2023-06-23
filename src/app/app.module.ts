import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { ForumComponent } from './Views/forum/forum.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './Views/home/home.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { QuestionsListComponent } from './Components/questions-list/questions-list.component';
import { RightSectionComponent } from './Components/right-section/right-section.component';
import { ChatCardComponent } from './Components/Utils/chat-card/chat-card.component';
import { TopicPillComponent } from './Components/Utils/topic-pill/topic-pill.component';
import { TopicComponent } from './Views/topic/topic.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './Views/admin/admin.component';
import { LoginComponent } from './Views/Auth/login/login.component';
import { RegisterComponent } from './Views/Auth/register/register.component';
import { ErrorComponent } from './Views/error/error.component';
import { PopupComponent } from './Components/popup/popup.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'forum', component: ForumComponent },
  { path: 'topics/:id', component: TopicComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: ErrorComponent },
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
    ChatCardComponent,
    TopicPillComponent,
    TopicComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    ErrorComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatIconModule,
    FormsModule,
    MatSidenavModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
