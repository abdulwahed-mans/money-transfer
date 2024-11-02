"use client";

import { useState } from 'react';
import { SearchFilters as SearchFiltersType, Transfer } from '@/types/transfer';
import SearchFilters from '@/components/SearchFilters';
import TransferList from '@/components/TransferList';
import { Search } from 'lucide-react';

export default function Home() {
  const [transfers, setTransfers] = useState<Transfer[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (filters: SearchFiltersType) => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) params.append(key, value);
      });

      const response = await fetch(`/api/transfers?${params.toString()}`);
      const data = await response.json();
      setTransfers(data);
    } catch (error) {
      console.error('Error fetching transfers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Search className="h-12 w-12 text-primary" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-primary mb-2">
            Financial Transfer Search
          </h1>
          <p className="text-lg text-muted-foreground">
            Search and track financial transfers across the globe
          </p>
        </div>

        <div className="space-y-6">
          <SearchFilters onSearch={handleSearch} />
          
          <div className="relative">
            {isLoading && (
              <div className="absolute inset-0 bg-background/50 flex items-center justify-center z-50">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            <TransferList transfers={transfers} />
          </div>
        </div>
      </div>
    </main>
  );
}