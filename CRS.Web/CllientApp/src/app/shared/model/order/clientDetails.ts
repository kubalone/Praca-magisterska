import { Vehicle } from '../Vehicles/vehicle';

export class clientDetails {

    id: number;
    typeOfCustomerID:number;
    companyName:string;
    name: string;
    surname: string;
   
    phone: string;
    vehicles: Vehicle[];
}