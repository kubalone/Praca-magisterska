import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from 'src/app/shared/customer/customer.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';
@Component({
  selector: 'app-type-of-customer-template',
  templateUrl: './type-of-customer-template.component.html',
  styleUrls: ['./type-of-customer-template.component.css']
})
export class TypeOfCustomerTemplateComponent implements OnInit {

  @Input() customers: Customer [];
  @Input() header: string;
  @Input() showLoading;
  @Input() showTable;
  @Input() showTypeOfCustomer;
  @Input() showInstitutionName;
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  fieldName: string;
  typeOfClient;
  userRole: boolean;

  constructor(private router: Router, private service: CustomerService, private communicate: ToastrService, private userService: UserService) { }

  ngOnInit() {
    this.tableOption();
    this.userRole = this.userService.getUserRole() === 'Admin';
  }
  popoverTitle: string = 'Usuwanie klienta';
  popoverMessage: string = 'Czy jesteś <b>pewny</b> że chcesz usunąć tego klienta?';
  confirmText: string = 'Tak';
  cancelText: string = 'Anuluj';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
  tableOption() {
    
    this.dtOptions = {
      info: false,
      ordering:false,
      language: {
        lengthMenu:"Pokaż _MENU_ ",
        search: "Wyszukaj",
        infoEmpty: "Brak wyników",
        emptyTable: "Brak danych",
        paginate: {
          first: "pierwszy",
          last: "następny",
          previous: "<<",
          next: ">>"
        }
        
      },
      lengthMenu: [ 5, 10, 15, 20, 30,40 ],
      pageLength: 20,

      dom: '<lf<t>ip>' 
    };
  }
  getTypeOfClient(id){
    id == 1 ? this.typeOfClient= "Osoba prywatna": this.typeOfClient="Przedsiębiorca"
    return this.typeOfClient;
  }
  checkIsNull(item)
  {
    item == '' ? this.fieldName = "-" : this.fieldName = item;
    return this.fieldName;
  }
  viewCustomer(id:number){
    this.router.navigate(['klienci/informacje', id])
  }

  delete(id) {
    this.service.deleteCustomer(id).subscribe(res => {
      this.customers = this.customers.filter(item => item.id != id);
      this.communicate.success('Klient został usunięty');
    },
    err => {
      this.communicate.error('Nie udało się usunąć klienta');
    })
  }

}
