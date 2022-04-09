import { Task } from '../services/service.model';

export interface ServiceProvider {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  contact_no: string;
  service_category: string;
  rating: number;
  address_line1: string;
  address_line2: string;
  district: string;
  gender: string;
  date_of_birth: string;
  reg_date: string;
  tasks: Task[];
  isavailable: boolean;
  location: Location;
  firm: Firm;
}

export interface FirmOwner {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  nic: string;
  email: string;
  contact_no: string;
  address_line1: string;
  address_line2: string;
  district: string;
  gender: string;
  date_of_birth: string;
  reg_date: string;
  location: Location;
  firm: Firm;
}

export interface ServiceProviderTemp {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_no: string;
  reg_date: string;
}

export interface Customer {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  gender: string;
  address_line1: string;
  address_line2: string;
  reg_date: string;
  location: Location;
}

export interface User {
  user_id: string;
  user_type: string;
  email: string;
  password: string;
  state: boolean;
}

export interface LogIn {
  email: string;
  password: string;
}

export interface Location {
  latitude: number;
  longtitude: number;
  town: string;
}

export interface Firm {
  owner: boolean;
  firm_id: string;
  firm_name: string;
}


export interface Admin {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  profile_pic: string;
  email: string;
  contact_no: string;
  gender: string;
  address_line1: string;
  address_line2: string;
  reg_date: string;
}

export interface Payment {
  user_id: string;
  user_type: string; // serviceProvider / firmOwner
  name: string;
  email: string;
  payments: PayTimes[];
}

export interface PayTimes {
  month: number;
  year: number;
  amount: number;
  due: number;
  pay_date: string;
}

export interface SproviderDetails {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  service_category: string;
  isavilable: boolean;
  email: string;
  contact_no: string;
  firm: Firm;
}

export interface FirmOwnerDetails {
  user_id: string;
  user_type: string;
  first_name: string;
  last_name: string;
  email: string;
  contact_no: string;
  firm: Firm;
}

export interface UserLocation {
  user_id: string;
  lat: number;
  long: number;
}


export interface Email {
  email: string;
  subject: string;
  html: string;
}