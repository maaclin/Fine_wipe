export type TicketType = 
  | 'Parking Ticket (Council)'
  | 'Parking Ticket (Private)'
  | 'Subscription Cancellation'
  | 'Accidental Charge'
  | 'Chargeback/Refund'
  | 'Council Property Issue'
  | 'Embassy/Consulate Matter'
  | 'Credit Card Dispute'
  | 'Credit Score Dispute'
  | 'Police Report'
  | 'Airport Dispute'
  | 'Late Delivery Refund'
  | 'Other';

export interface DisputeFormData {
  id: string;
  location: string;
  dateOfViolation: string;
  ticketType: TicketType;
  additionalNotes: string;
  ticketImage?: File;
}

export interface DisputeResponse {
  success: boolean;
  message: string;
  appealLetter?: string;
  errorDetails?: string;
}