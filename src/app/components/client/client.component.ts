import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../model/class/client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { IAPIResponseModel } from '../../model/interface/role';
import { AsyncPipe, DatePipe, JsonPipe, UpperCasePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { AlertComponent } from '../../reusableComponents/alert/alert.component';
import { MyButtonComponent } from '../../reusableComponents/my-button/my-button.component';

@Component({
  selector: 'app-client',
  imports: [
    FormsModule,
    UpperCasePipe,
    DatePipe,
    AsyncPipe,
    AlertComponent,
    MyButtonComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];
  currentDate: Date = new Date();

  clientService = inject(ClientService);

  userList$: Observable<any> = new Observable<any>();

  ngOnInit(): void {
    this.loadClient();
    this.userList$ = this.clientService.getAllUser();
  }

  loadClient(): void {
    this.clientService.getAllClients().subscribe((res: IAPIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveClient(): void {
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert('Client Created Successfully');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }

  onDelete(id: number): void {
    const isDelete = confirm('Are You Sure want to Delete');
    if (isDelete) {
      this.clientService
        .deleteClientById(id)
        .subscribe((res: IAPIResponseModel) => {
          if (res.result) {
            alert('Client Delete Success');
            this.loadClient();
          } else {
            alert(res.message);
          }
        });
    }
  }

  onEdit(data: Client) {
    this.clientObj = data;
  }
}
