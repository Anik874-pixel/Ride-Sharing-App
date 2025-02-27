export interface RideHistory {
  id: string;
  date: string;
  pickup: string;
  destination: string;
  fare: number;
  rideType: 'economy' | 'comfort' | 'premium';
  status: 'completed' | 'cancelled';
  driverName?: string;
  rating?: number; 
  feedback?: string;  
}