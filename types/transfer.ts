export interface Transfer {
  id: string;
  senderId: string;
  senderName: string;
  senderCountry: string;
  recipientId: string;
  recipientName: string;
  recipientCountry: string;
  amount: number;
  currency: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface SearchFilters {
  query: string;
  idNumber?: string;
  transferId?: string;
  country?: string;
  startDate?: string;
  endDate?: string;
}