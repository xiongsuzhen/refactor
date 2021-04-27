import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  sysName='MES系统';
  userName='';
  password='';
  loginFail=false;
  checked = false;
  constructor(
    private router: Router,
  ) { }
  doLogin(){
    this.router.navigateByUrl('/page-index');
  }
  onKeyup(e){
    if ("Enter" == e.key) {
      this.doLogin();
    }
  }
  ngOnInit() {
  }

}
