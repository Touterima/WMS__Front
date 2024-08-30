import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:String = 'http://localhost:8080/auth/'

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(private http : HttpClient) { }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token;
  }

  login(requestBody : {email : string , password : string}) {
    return this.http.post(this.baseUrl+`login`,requestBody,{ headers : this.headers , withCredentials: true  })
  }

  logout() {
    return this.http.post(this.baseUrl+`logout`,{ headers : this.headers , withCredentials: true  })
  }

  register(requestBody :any) {
    return this.http.post(this.baseUrl+`register`,requestBody,{ headers : this.headers , withCredentials: true  })
  }

  affiliateRegister(id:string, requestBody :any) {
    return this.http.post(this.baseUrl+`register/${id}`,requestBody,{ headers : this.headers , withCredentials: true  })
  }
}