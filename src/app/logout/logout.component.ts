import { Component } from '@angular/core';
import { UserLogin } from '../user-login';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionServiceService } from '../auction-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  userLogin : UserLogin
  hideDiv:boolean
  errorMessage:string=''
  dynMsg = 'You have been logged out'
  dynClass='alert alert-success'

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private auctionService: AuctionServiceService) {
          console.log('user form component load');
    this.userLogin = new UserLogin();
  }

  ngOnInit():void{
    this.hideDiv=false
    window.localStorage.removeItem('token');
    window.localStorage.removeItem('userLoginId');
    window.localStorage.removeItem('userTypeId');
  }

  logIn(){
    this.auctionService.login(this.userLogin).subscribe(result => {
      this.hideDiv=true
      if(result.responseCode == 200){
        window.localStorage.setItem('token', result.token);
        window.localStorage.setItem('userLoginId',result.userLoginId);
        window.localStorage.setItem('userTypeId',result.userTypeId);
        console.log(result)
        if(parseInt(result.userTypeId) == 1){
          this.router.navigate(['auctioneerdashboard']);
        }
        else if(parseInt(result.userTypeId) == 2){
          this.router.navigate(['bidderdashboard']);
        }
      }
      else{
        this.hideDiv=false
        this.dynClass='alert alert-danger'
        this.dynMsg='Email Id or Password is Incorrect'
      }
    },error => {
      this.hideDiv=false
      this.dynClass='alert alert-danger'
        this.dynMsg='Email Id or Password is Incorrect'
    });
  }

  signUp(){
    this.router.navigate(['createuser']);
  }
}
