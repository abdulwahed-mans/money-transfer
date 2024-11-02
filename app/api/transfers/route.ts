import { Transfer } from '@/types/transfer';

const mockTransfers: Transfer[] = [
  {
    id: 'TRX-001',
    senderId: 'ID-123',
    senderName: 'John Smith',
    senderCountry: 'United States',
    recipientId: 'ID-456',
    recipientName: 'Maria Garcia',
    recipientCountry: 'Spain',
    amount: 1500.00,
    currency: 'USD',
    date: '2024-03-25',
    status: 'completed'
  },
  {
    id: 'TRX-002',
    senderId: 'ID-789',
    senderName: 'Emma Wilson',
    senderCountry: 'United Kingdom',
    recipientId: 'ID-012',
    recipientName: 'Lucas Silva',
    recipientCountry: 'Brazil',
    amount: 2300.00,
    currency: 'GBP',
    date: '2024-03-24',
    status: 'completed'
  },
  // Add more mock data as needed
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query')?.toLowerCase() || '';
  const idNumber = searchParams.get('idNumber')?.toLowerCase() || '';
  const transferId = searchParams.get('transferId')?.toLowerCase() || '';
  const country = searchParams.get('country')?.toLowerCase() || '';
  const startDate = searchParams.get('startDate') || '';
  const endDate = searchParams.get('endDate') || '';

  let filteredTransfers = [...mockTransfers];

  if (query) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.senderName.toLowerCase().includes(query) ||
      transfer.recipientName.toLowerCase().includes(query)
    );
  }

  if (idNumber) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.senderId.toLowerCase().includes(idNumber) ||
      transfer.recipientId.toLowerCase().includes(idNumber)
    );
  }

  if (transferId) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.id.toLowerCase().includes(transferId)
    );
  }

  if (country) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.senderCountry.toLowerCase().includes(country) ||
      transfer.recipientCountry.toLowerCase().includes(country)
    );
  }

  if (startDate && endDate) {
    filteredTransfers = filteredTransfers.filter(transfer =>
      transfer.date >= startDate && transfer.date <= endDate
    );
  }

  return Response.json(filteredTransfers);
}