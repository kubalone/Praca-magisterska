import { Component, OnInit, Input } from '@angular/core';
import { Customer } from 'src/app/shared/model/Customers/customer';
import { Router } from '@angular/router';
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

  constructor(private router: Router) { }

  ngOnInit() {

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
      //paging: false,
     //lengthChange: false,
      //searching: false,
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
}
