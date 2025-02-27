export interface UserProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    profileImage?: string;
  }
  
  export interface RideStats {
    totalRides: number;
    completedRides: number;
    cancelledRides: number;
    totalSpent: number;
    averageRating: number;
    frequentDestinations: string[];
  }