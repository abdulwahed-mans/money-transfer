"use client";

import { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchFilters } from '@/types/transfer';
import { Card, CardContent } from "@/components/ui/card";

interface SearchFiltersProps {
  onSearch: (filters: SearchFilters) => void;
}

export default function SearchFilters({ onSearch }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    idNumber: '',
    transferId: '',
    country: '',
    startDate: '',
    endDate: ''
  });

  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();

  const handleSearch = () => {
    onSearch({
      ...filters,
      startDate: startDate ? format(startDate, 'yyyy-MM-dd') : undefined,
      endDate: endDate ? format(endDate, 'yyyy-MM-dd') : undefined
    });
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      idNumber: '',
      transferId: '',
      country: '',
      startDate: '',
      endDate: ''
    });
    setStartDate(undefined);
    setEndDate(undefined);
  };

  const hasActiveFilters = Object.values(filters).some(value => value) || startDate || endDate;

  return (
    <Card className="bg-gradient-to-br from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-900/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">Name Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  className="pl-9 transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                  placeholder="Search by sender or recipient"
                  value={filters.query}
                  onChange={(e) => setFilters({ ...filters, query: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">ID Number</label>
              <Input
                className="transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                placeholder="Personal identification number"
                value={filters.idNumber}
                onChange={(e) => setFilters({ ...filters, idNumber: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">Transfer ID</label>
              <Input
                className="transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                placeholder="Enter transfer ID"
                value={filters.transferId}
                onChange={(e) => setFilters({ ...filters, transferId: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">Country</label>
              <Input
                className="transition-shadow duration-200 hover:shadow-sm focus:shadow-md"
                placeholder="Search by country"
                value={filters.country}
                onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">Start Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal transition-shadow duration-200 hover:shadow-sm",
                      !startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {startDate ? format(startDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                    initialFocus
                    className="rounded-md border shadow-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/90">End Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal transition-shadow duration-200 hover:shadow-sm",
                      !endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                    {endDate ? format(endDate, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                    initialFocus
                    className="rounded-md border shadow-lg"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-end gap-3">
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="group transition-all duration-200"
              >
                <X className="mr-2 h-4 w-4 transition-transform group-hover:rotate-90" />
                Clear Filters
              </Button>
            )}
            <Button
              onClick={handleSearch}
              className="bg-primary hover:bg-primary/90 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              <Search className="mr-2 h-4 w-4" />
              Search Transfers
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}