import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private baseUrl: String = 'http://localhost:8080/notification/'

  constructor(private http: HttpClient) {
  }
  getUnread() {
    return this.http.get(this.baseUrl + `getUnread`);
  }
  getAllByUser() {
    return this.http.get(this.baseUrl + 'getAllByUser');
  }
  getNotification(id:any){
    return this.http.get(this.baseUrl+'get/'+id);
  }
  getAll(){
    return this.http.get(this.baseUrl+'getAll');
  }
  delete(id:String){
    return this.http.delete(this.baseUrl+`delete/${id}`);
  }
  update(requestBody: any){
    return this.http.put(this.baseUrl+'update',requestBody);
  }
  add(requestBody:any){
    return this.http.post(this.baseUrl+'add',requestBody);
  }
}