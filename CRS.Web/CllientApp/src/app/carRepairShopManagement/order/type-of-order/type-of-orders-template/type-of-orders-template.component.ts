import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-type-of-orders-template',
  templateUrl: './type-of-orders-template.component.html',
  styleUrls: ['./type-of-orders-template.component.css']
})
export class TypeOfOrdersTemplateComponent implements OnInit {
  @Input() orders: [];
  @Input() header: string;
  @Input() showLoading;
  @Input() showTable;
  @Input() showFinishedDate;
  dataTable: any;

  dtOptions: DataTables.Settings = {};

  fieldName: string;
  

  constructor(private router: Router) { }

  ngOnInit() {
    this.datatableSettings();
  }
  datatableSettings() {
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
  viewOrder(id:number){
    this.router.navigate(['naprawy/informacje', id])
  }
}