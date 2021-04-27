import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PageIndexRoutingModule} from './page-index.routing.module';
import {LoadIndexComponent} from './load-index/load-index.component';
import { NzInputModule } from 'ng-zorro-antd/input';
@NgModule({
  imports: [
    CommonModule,
    PageIndexRoutingModule,
    NzInputModule
  ],
  declarations: [LoadIndexComponent]
})
export class PageIndexModule { }
