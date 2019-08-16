import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/shared/order/order.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user/user.service';

@Component({
  selector: 'app-type-of-orders-template',
  templateUrl: './type-of-orders-template.component.html',
  styleUrls: ['./type-of-orders-template.component.css']
})
export class TypeOfOrdersTemplateComponent implements OnInit {
  @Input() orders: any[];
  @Input() header: string;
  @Input() showLoading;
  @Input() showTable;
  @Input() showFinishedDate;
  dataTable: any;
  userRole: boolean;
  statusOptions = [
    { id: false , status: "Przyjęte"},
    { id: true, status: "Zakończone" }
]
  dtOptions: DataTables.Settings = {};

  fieldName: string;
  

  constructor(private router: Router, private service: OrderService, private communicate: ToastrService, private userService: UserService) { }

  ngOnInit() {
  
    this.datatableSettings();
    this.userRole = this.userService.getUserRole() === 'Admin';
  }
 
  popoverTitle: string = 'Usuwanie zlecenia';
  popoverMessage: string = 'Czy jesteś <b>pewny</b> że chcesz usunąć dane zlecenie?';
  confirmText: string = 'Tak';
  cancelText: string = 'Anuluj';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
  
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
  edit(id) {
    this.router.navigate(['edytuj-zlecenie', id])
  }
  viewVehicle(id){
    this.router.navigate(['pojazdy/informacje', id])
  }
  delete(id) {
    this.service.deleteOrder(id).subscribe(res => {
      this.orders = this.orders.filter(item => item.id != id);
      this.communicate.success('Zlecenie zostało usunięte');
    },
    err => {
      this.communicate.error('Nie udało się usunąć zlecenia');
    })
  }
}