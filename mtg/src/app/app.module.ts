import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameSetupComponent } from './game-setup/game-setup.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GamePlayComponent } from './game-play/game-play.component';

const routes: Routes = [
    { path: 'game-setup', component: GameSetupComponent },
    { path: 'game-play', component: GamePlayComponent },
    { path: 'game-results', component: GameResultsComponent },
    { path: 'view-stats', component: ViewStatsComponent },
    { path: 'view-users', component: ViewUsersComponent },
    { path: 'view-user-profile', component: ViewUserProfileComponent },
    { path: 'view-decks', component: ViewDecksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameSetupComponent,
    GamePlayComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
