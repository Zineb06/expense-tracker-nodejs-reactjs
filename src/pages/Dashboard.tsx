import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useExpenses, useCategories } from '@/hooks/useExpenses';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { AddExpenseDialog } from '@/components/AddExpenseDialog';
import { ExpenseCard } from '@/components/ExpenseCard';
import { ExpenseStats } from '@/components/ExpenseStats';
import { LogOut, Wallet } from 'lucide-react';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const { data: expenses, isLoading } = useExpenses(undefined, undefined, categoryFilter || undefined);
  const { data: categories } = useCategories();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                <Wallet className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Expense Tracker</h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {user.user_metadata?.full_name || user.email}
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        {expenses && <ExpenseStats expenses={expenses} />}

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories?.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <span className="flex items-center gap-2">
                      <span>{category.icon}</span>
                      <span>{category.name}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <AddExpenseDialog />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          {isLoading ? (
            <p className="text-center text-muted-foreground py-8">Loading expenses...</p>
          ) : expenses && expenses.length > 0 ? (
            <div className="space-y-3">
              {expenses.map((expense) => (
                <ExpenseCard key={expense.id} expense={expense} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground mb-4">No expenses yet</p>
              <AddExpenseDialog />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
