import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  theme='dark';
  isCollapsed = true;

  isShow=true;

  siderList=[
    {id:0,title:'首页    '},
    {id:1,title:'系统管理',children:[{id:10,title:'系统设置'}]},
    {id:2,title:'工艺管理',children:[{id:10,title:'系统设置'}]},
    {id:3,title:'计划管理',children:[{id:10,title:'系统设置'}]},
  ];
  constructor() { }


  toTheme(e){
    this.isShow=!this.isShow;
    console.log(e)
    if(e=='dark'){
      this.theme='light'
    }else{
      this.theme='dark'
    }
    
  }
  logout(){

  }
  ngOnInit() {
  }

}
