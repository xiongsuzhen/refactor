import { Routes, RouterModule } from '@angular/router';
import { LoadIndexComponent } from './load-index/load-index.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoadIndexComponent },    
    ],
  },
];

export const PageIndexRoutingModule = RouterModule.forChild(routes);
