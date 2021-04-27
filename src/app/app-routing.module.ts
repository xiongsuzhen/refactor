import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AuthGuard } from './common/guard/auth.guard';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login/login.component'
const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    // 显示到内容显示主体区域
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'page-index', pathMatch: 'full' },
      {
        path:'page-index',
        loadChildren:()=>import('./components/routes/page-index/page-index.module').then(mod=>mod.PageIndexModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
