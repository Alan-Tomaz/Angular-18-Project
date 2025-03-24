import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../model/class/client';
import { environment } from '../../environments/environment.development';
import { IAPIResponseModel } from '../model/interface/role';
import { Constant } from '../constant/Constant';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}

  getAllClients(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(
      `${environment.API_URL}${Constant.API_METHOD.GET_ALL_CLIENT}`
    );
  }

  getAllUser() {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  getAllClientProjects(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(
      `${environment.API_URL}${Constant.API_METHOD.GET_ALL_PROJECT}`
    );
  }

  getAllEmployee(): Observable<IAPIResponseModel> {
    return this.http.get<IAPIResponseModel>(
      `${environment.API_URL}${Constant.API_METHOD.GET_ALL_EMP}`
    );
  }

  addUpdate(obj: Client): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(
      `${environment.API_URL}AddUpdateClient`,
      obj
    );
  }

  addClientProjectUpdate(obj: Client): Observable<IAPIResponseModel> {
    return this.http.post<IAPIResponseModel>(
      `${environment.API_URL}AddUpdateClientProject`,
      obj
    );
  }

  deleteClientById(id: number): Observable<IAPIResponseModel> {
    return this.http.delete<IAPIResponseModel>(
      `${environment.API_URL}DeleteClientByClientId?clientId=${id}`
    );
  }
}
