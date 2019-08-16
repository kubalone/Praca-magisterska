import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { VehicleService } from 'src/app/shared/vehicle/vehicle.service';
import { Brand } from 'src/app/shared/model/Vehicles/brand';
import { VehicleModel } from 'src/app/shared/model/Vehicles/vehicleModel';
import { Vehicle } from 'src/app/shared/model/Vehicles/vehicle';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  vehicles:  Vehicle [];
  dataTable: any;
  dtOptions: DataTables.Settings = {};
  showLoading = true;
  showTable = false;
  fieldName: string;
  userRole: boolean;
  constructor(private modalService: NgbModal,private communicate: ToastrService,  private service: VehicleService, private router: Router, private userService: UserService) { }

  ngOnInit() {
  this.service.getVehicles().subscribe((res:any) => {
    this.vehicles = res;
    this.showLoading= false;
    this.showTable = true;
  });
  this.dataTableOptions();
  this.userRole = this.userService.getUserRole() === 'Admin';
  }

  popoverTitle: string = 'Usuwanie pojazdu';
  popoverMessage: string = 'Czy jesteś <b>pewny</b> że chcesz usunąć dany pojazd?';
  confirmText: string = 'Tak';
  cancelText: string = 'Anuluj';
  confirmClicked: boolean = false;
  cancelClicked: boolean = false;
 
dataTableOptions() {
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

  checkIsNull(item)
  {
    item == '' ? this.fieldName = "-" : this.fieldName = item;
    return this.fieldName;
  }
  viewVehicle(id:number) {
    this.router.navigate(['pojazdy/informacje', id])
  }

  delete(id) {
    this.service.deleteVehicle(id).subscribe(res => {
      this.vehicles = this.vehicles.filter(item => item.id != id);
      this.communicate.success('Pojazd został usunięty');
    },
    err => {
      this.communicate.error('Nie udało się usunąć pojazdu');
    })
  }
}
