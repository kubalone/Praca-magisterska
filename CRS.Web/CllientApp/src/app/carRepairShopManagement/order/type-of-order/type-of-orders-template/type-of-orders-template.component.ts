import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order/order.service';
import { ToastrService } from 'ngx-toastr';

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
  statusOptions = [
    { id: false , status: "Przyjęte"},
    { id: true, status: "Zakończone" }
]
  dtOptions: DataTables.Settings = {};

  fieldName: string;
  

  constructor(private router: Router, private service: OrderService, private communicate: ToastrService,) { }

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
  changeStatus(event, id) {
    console.log(event+" "+id);
    this.service.changeStatus(id, event).subscribe(() => {
      this.redirectTo(this.router.url);
      this.communicate.success('Status został zauktualizowany');
    },
    err =>{
      this.communicate.error('Nie udało się zaktualizować klienta');
    })
   
  }
  redirectTo(uri) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }
}