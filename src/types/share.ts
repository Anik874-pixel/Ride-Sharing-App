export interface SharedRide {
    id: string;
    rideId: string;
    sharingCode: string;
    totalFare: number;
    numberOfPassengers: number;
    splitAmount: number;
    status: 'pending' | 'accepted' | 'completed';
    passengers: Passenger[];
  }
  
  export interface Passenger {
    id: string;
    name: string;
    phone: string;
    status: 'pending' | 'accepted' | 'declined';
    paymentStatus: 'pending' | 'completed';
  }