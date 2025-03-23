import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { IAPIResponseModel, IRole } from '../../model/interface/role';

@Component({
  selector: 'app-roles',
  imports: [],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  http: any = inject(HttpClient);
  roleList: IRole[] = [];

  ngOnInit(): void {
    // Get All Roles
    this.getAllRoles();
  }

  getAllRoles() {
    this.http
      .get('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
      .subscribe((res: IAPIResponseModel) => {
        this.roleList = res.data;
      });
  }
}
