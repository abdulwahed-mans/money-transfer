"use client";

import { Transfer } from '@/types/transfer';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';

interface TransferListProps {
  transfers: Transfer[];
}

export default function TransferList({ transfers }: TransferListProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusColor = (status: Transfer['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  return (
    <div className="rounded-lg border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transfer ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Sender</TableHead>
            <TableHead>Recipient</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transfers.map((transfer) => (
            <TableRow key={transfer.id}>
              <TableCell className="font-medium">{transfer.id}</TableCell>
              <TableCell>{format(new Date(transfer.date), 'MMM d, yyyy')}</TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transfer.senderName}</div>
                  <div className="text-sm text-muted-foreground">{transfer.senderCountry}</div>
                </div>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{transfer.recipientName}</div>
                  <div className="text-sm text-muted-foreground">{transfer.recipientCountry}</div>
                </div>
              </TableCell>
              <TableCell>{formatCurrency(transfer.amount, transfer.currency)}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={getStatusColor(transfer.status)}>
                  {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
          {transfers.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8">
                No transfers found matching your search criteria
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}