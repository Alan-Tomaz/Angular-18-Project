import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientService } from '../../services/client.service';
import {
  ClientProject,
  IAPIResponseModel,
  IEmployee,
} from '../../model/interface/role';
import { Client } from '../../model/class/client';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-client-project',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completedDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
  });

  clientSrv = inject(ClientService);
  employeeList: IEmployee[] = [];
  clientList: Client[] = [];

  firstName: any = signal(1);
  projectList = signal<ClientProject[]>([]);

  ngOnInit(): void {
    const name = this.firstName();
    this.getAllEmployee();
    this.getAllClient();
    this.getAllClientProject();
  }

  changeFName() {
    this.firstName.set('Angular 18');
  }

  getAllEmployee() {
    this.clientSrv.getAllEmployee().subscribe((res: IAPIResponseModel) => {
      this.employeeList = res.data;
    });
  }

  getAllClientProject() {
    this.clientSrv
      .getAllClientProjects()
      .subscribe((res: IAPIResponseModel) => {
        this.projectList.set(res.data);
      });
  }

  getAllClient() {
    this.clientSrv.getAllClients().subscribe((res: IAPIResponseModel) => {
      this.clientList = res.data;
    });
  }

  onSaveProject(): void {
    const formValue = this.projectForm.value;
    debugger;
    this.clientSrv
      .addClientProjectUpdate(formValue)
      .subscribe((res: IAPIResponseModel) => {
        if (res.result) {
          alert('Project Created Successfully');
        } else {
          alert(res.message);
        }
      });
  }
}
