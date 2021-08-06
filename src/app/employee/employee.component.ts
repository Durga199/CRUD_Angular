import { Component, OnInit } from '@angular/core';
import {FormBuilder,FormGroup} from '@angular/forms'
import { EmployeeModel } from './employee.model';
import {ApiService} from '../shared/api.service'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  formvalue !: FormGroup
  employeeData !: any
  showAdd !: boolean
  showUpdate !: boolean
  empModel : EmployeeModel = new EmployeeModel()
  

  constructor(private formbuilder : FormBuilder,private api : ApiService) { }

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      firstName : [''],
      lastName : [''],
      email : [''],
      mobile : [''],
      salary : [''],
    })
    this.showEmployee()
  }

  postEmployeeDetails(){
    this.empModel.firstName = this.formvalue.value.firstName
    this.empModel.lastName = this.formvalue.value.lastName
    this.empModel.email = this.formvalue.value.email
    this.empModel.mobile = this.formvalue.value.mobile
    this.empModel.salary = this.formvalue.value.salary

    this.api.postEmployee(this.empModel)
    .subscribe((res: any)=> {
      alert("Employee added successfully")
      this.formvalue.reset()
      this.showEmployee()
    },err => {
      alert('something went wrong.')
    })   
  }

  showEmployee(){
    this.api.getEmployee()
    .subscribe(res =>{
      this.employeeData = res
    })
  }

  removeEmployee(item : any){
    this.api.deleteEmployee(item.id)
    .subscribe(res =>{
      alert("Record Deleted successfully")
      this.showEmployee()
    })
  }
  editEmployee(item : any){
    this.showAdd = false
    this.showUpdate = true
    this.empModel.id = item.id
    this.formvalue.controls['firstName'].setValue(item.firstName)
    this.formvalue.controls['lastName'].setValue(item.lastName)
    this.formvalue.controls['email'].setValue(item.email)
    this.formvalue.controls['mobile'].setValue(item.mobile)
    this.formvalue.controls['salary'].setValue(item.salary)
  }

  updateRecord(){
    this.empModel.firstName = this.formvalue.value.firstName
    this.empModel.lastName = this.formvalue.value.lastName
    this.empModel.email = this.formvalue.value.email
    this.empModel.mobile = this.formvalue.value.mobile
    this.empModel.salary = this.formvalue.value.salary

    this.api.updateEmployee(this.empModel,this.empModel.id)
    .subscribe(res=>{
      alert("updated Successfully")
      let ref = document.getElementById('cancel')
      ref?.click()
      this.formvalue.reset()
      this.showEmployee()

    })
  }

  addButton(){
    this.formvalue.reset()
    this.showAdd = true
    this.showUpdate = false

  }

}
