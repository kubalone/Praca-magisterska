import { Vehicle } from '../Vehicles/vehicle';


export class Customer {
    id: number;
    typeOfCustomerID: number;
    dateTimeAddCustomer?: Date;
    companyName: string;
    name: string;
    surname: string;
    province: string;
    city: string;
    zipCode: string;
    street: string;
    numberOfBuilding: string;
    numberOfApartment: string;
    email: string;
    phone: string;
    vehicles: Vehicle[];
}