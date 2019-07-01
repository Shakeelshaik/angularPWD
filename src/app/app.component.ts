import { Component, OnInit } from '@angular/core';
import { ApidataService } from './service/apidata.service';
import { UserType } from './userType';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angularPWD';
  userData$: UserType[];

  constructor(private http: ApidataService, private updates: SwUpdate){
    //If there any changes int he app here we alert and refresh the page with changes
    updates.available.subscribe(event => {
      alert('Change in your app, will refresh!');
      updates.activateUpdate().then(() => document.location.reload());  
    });
  }
  ngOnInit() { 
    this.http.getUsers().subscribe(userData => {
      this.userData$ = userData.data;
      console.log(this.userData$);
    });
  }
}