import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders , HttpRequest} from '@angular/common/http';
import { environment } from '../environments/environment';


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
  
  constructor(private http: HttpClient){
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
    
    this.http.post('services/records' + '?start=' + this.formatDate(this.startDate) +"&end="+ this.formatDate(this.endDate)
    +"&email="+ this.newEmail,  this.emptyBody)
    .subscribe((response)=>{
      this.response = response;
      console.log(response);
      this.isPostSuccess = true;
    })
  }
  formatDate(startDateInitial: Date) : String{
    return startDateInitial.toLocaleString().replace(/\//g,".").replace(',','');
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