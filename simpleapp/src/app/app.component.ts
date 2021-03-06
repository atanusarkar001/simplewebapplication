import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'app';
  email: string;
  response: any;
  length: number = 10;
  emptyBody: any='';
  startDate: Date = new Date();
  endDate: Date = new Date();
  startTime: String = '19:00';
  endTime: String = '19:00';
  newEmail: String='';
  isWrongEmailFormat: boolean = false;
  EMAIL_REGEX: RegExp =new RegExp('.+\@.+\..+','gi');
  isPostSuccess: boolean = false;
  isTableShow: boolean = false;
  selected: any;
  
  constructor(private http: HttpClient, private datepipe: DatePipe){
  }
  search(){
    this.http.get('services/records?' + 'email=' + this.email + '&length=' +this.length)
    .subscribe((response: any)=>{
      this.response = response;
      console.log(response);
      this.isTableShow = true;
      
    })
  }

  
  addNewEntry(){

    this.http.post('services/records' + '?start=' + this.formatDateTime(this.startDate, this.startTime,)+ 
    "&end="+ this.formatDateTime(this.endDate, this.endTime)
    +"&email="+ this.newEmail, this.emptyBody)
    .subscribe((response)=>{
      this.response = response;
      console.log(response);
      this.isPostSuccess = true;
    })
  }
  formatDateTime(dateInitial: Date, timeInitial : String) : String{
    return this.datepipe.transform(dateInitial,"dd.MM.yyyy") +' ' + timeInitial;
  }
  emailFocusOut(email: string){
    if(!email.match(this.EMAIL_REGEX)){
      this.isWrongEmailFormat = true;
      
    } else{
      this.isWrongEmailFormat = false;
    }
  }
  resetFields(){
    this.isWrongEmailFormat = false;
    this.isPostSuccess = false;
    this.newEmail = "";
    this.email = "";
    this.isTableShow = false;
  }
}