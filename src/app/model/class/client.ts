export class Client {
  clientId: number;
  contactPersonName: string;
  companyName: string;
  contactNo: string;
  address: string;
  regNo: string;
  gstNo: string;
  city: string;
  pincode: string;
  state: string;
  employeeStrength: string;

  constructor() {
    this.contactNo = '';
    this.clientId = 0;
    this.address = '';
    this.contactPersonName = '';
    this.regNo = '';
    this.gstNo = '';
    this.city = '';
    this.pincode = '';
    this.state = '';
    this.employeeStrength = '';
    this.companyName = '';
  }
}
