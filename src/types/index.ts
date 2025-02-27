export interface Location {
    id: string;
    name: string;
    coordinates: {
      lat: number;
      lng: number;
    };
    address?: string;
  }
  
  export interface RideOption {
    id: string;
    name: string;
    capacity: number;
    fare: number;
    time: number;
    description?: string;
    image?: string;
  }
  
  export interface RouteInfo {
    distance: string;
    duration: string;
    fare: number;
  }
  
  export interface MapMarker {
    lat: number;
    lng: number;
    label?: string;
  }
  
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