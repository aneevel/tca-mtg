import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { GameSetupComponent } from './game-setup/game-setup.component';
import { GamePlayComponent } from './game-play/game-play.component';
import { GameResultsComponent } from './game-results/game-results.component';
import { ViewStatsComponent } from './view-stats/view-stats.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ViewUserProfileComponent } from './view-user-profile/view-user-profile.component';
import { ViewDecksComponent } from './view-decks/view-decks.component';
import { NavigationComponent } from './navigation/navigation.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


const routes: Routes = [
    { path: 'game-setup', component: GameSetupComponent },
    { path: 'game-play', component: GamePlayComponent },
    { path: 'game-results', component: GameResultsComponent },
    { path: 'view-stats', component: ViewStatsComponent },
    { path: 'view-users', component: ViewUsersComponent },
    { path: 'view-user-profile', component: ViewUserProfileComponent },
    { path: 'view-decks', component: ViewDecksComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameSetupComponent,
    GamePlayComponent,
    GameResultsComponent,
    ViewStatsComponent,
    ViewUsersComponent,
    ViewUserProfileComponent,
    ViewDecksComponent,
    NavigationComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
