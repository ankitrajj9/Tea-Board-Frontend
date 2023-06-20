import { Component } from '@angular/core';
import { UserLogin } from '../user-login';
import { ActivatedRoute, Router } from '@angular/router';
import { AuctionServiceService } from '../auction-service.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent {
  userLogin : UserLogin
  mainDiv = false;
  divShow = true;

  constructor(
    private route: ActivatedRoute, 
      private router: Router, 
        private auctionService: AuctionServiceService) {
          console.log('user form component load');
    this.userLogin = new UserLogin();
  }

  ngOnInit():void{
    
  }

  saveUser() {
    this.auctionService.saveUser(this.userLogin).subscribe(result => {
      if(result.responseCode == 200){
        this.mainDiv = true;
        this.divShow = false;
      }
      console.log(result)
    });
  }

  logIn(){
    this.router.navigate(['login']);
  }

}
