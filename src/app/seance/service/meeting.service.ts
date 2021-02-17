import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class MeetingService {

  private url: string;
  

  constructor(
    private http: HttpClient
    ) {
    this.url = 'https://ensa-classroom.herokuapp.com/create-meeting';
  }

  public createMeeting()  {
    
//   const headers = new HttpHeaders({
//     Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6IlVMZVBjeDhBUjRxbWxnb0NUREdZNUEiLCJleHAiOjE2NDA5OTE2MDAsImlhdCI6MTYxMjk5OTcwNn0.cf8BOSjJPZzqTAthRQt_9WuixoUPCX8UqvrxhYuqam8' // Do not publish or share your token with anyone.
//     ,'Access-Control-Allow-Origin':'*'});

//   let body = {
//     topic: 'ensa classroom',
//     type: 2,
//     settings: {
//         join_before_host: true,
//         jbh_time: 0,
//         mute_upon_entry: true,
//         approval_type: 2
//     }}

      return this.http.get<any>(this.url);
  }


}
