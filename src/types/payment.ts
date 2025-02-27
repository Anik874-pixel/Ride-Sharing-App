export interface PaymentMethod {
    id: string;
    type: 'card';
    last4: string;
    brand: string;
    expiryMonth: number;
    expiryYear: number;
    isDefault: boolean;
  }
  
  export interface PaymentHistory {
    id: string;
    amount: number;
    date: string;
    status: 'completed' | 'failed' | 'pending';
    paymentMethod: string;
    rideId: string;
  }