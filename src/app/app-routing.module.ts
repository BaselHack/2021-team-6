import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'create-lobby',
    loadChildren: () =>
      import('./lobby/create-lobby/create-lobby.module').then(
        (m) => m.CreateLobbyPageModule
      ),
  },
  {
    path: 'join-lobby',
    loadChildren: () =>
      import('./lobby/join-lobby/join-lobby.module').then(
        (m) => m.JoinLobbyPageModule
      ),
  },
  {
    path: 'view-lobby/:lobbyCode',
    loadChildren: () =>
      import('./lobby/view-lobby/view-lobby.module').then(
        (m) => m.ViewLobbyPageModule
      ),
  },
  {
    path: 'answer-question',
    loadChildren: () =>
      import('./game/answer-question/answer-question.module').then(
        (m) => m.AnswerQuestionPageModule
      ),
  },
  {
    path: 'rate-answers',
    loadChildren: () =>
      import('./game/rate-answers/rate-answers.module').then(
        (m) => m.RateAnswersPageModule
      ),
  },
  {
    path: 'scoreboard',
    loadChildren: () =>
      import('./game/scoreboard/scoreboard.module').then(
        (m) => m.ScoreboardPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
