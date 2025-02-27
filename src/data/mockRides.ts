import { RideHistory } from '../types/ride';

export const mockRideHistory: RideHistory[] = [
  {
    id: '1',
    date: '2024-03-19T10:30:00',
    pickup: 'Mumbai Airport',
    destination: 'Gateway of India',
    fare: 450,
    rideType: 'comfort',
    status: 'completed',
    driverName: 'Rahul Kumar'
  },
  {
    id: '2',
    date: '2024-03-18T15:45:00',
    pickup: 'Andheri Station',
    destination: 'Bandra Kurla Complex',
    fare: 350,
    rideType: 'economy',
    status: 'completed',
    driverName: 'Rajan Bhai'
  },
  {
    id: '3',
    date: '2024-03-17T09:15:00',
    pickup: 'Juhu Beach',
    destination: 'Colaba',
    fare: 550,
    rideType: 'premium',
    status: 'cancelled',
    driverName: 'Sanya Kundra'
  },
  {
    id: '4',
    date: '2024-03-16T18:20:00',
    pickup: 'Lower Parel',
    destination: 'Powai',
    fare: 400,
    rideType: 'comfort',
    status: 'completed',
    driverName: 'Avdesh Kumar'
  }
];