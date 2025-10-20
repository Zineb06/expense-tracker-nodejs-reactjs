import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { type Expense } from '@/hooks/useExpenses';

interface ExpenseStatsProps {
  expenses: Expense[];
}

export function ExpenseStats({ expenses }: ExpenseStatsProps) {
  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
  
  const today = new Date();
  const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const monthlyExpenses = expenses.filter(
    (expense) => new Date(expense.expense_date) >= firstDayOfMonth
  );
  const monthlyTotal = monthlyExpenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  const avgExpense = expenses.length > 0 ? total / expenses.length : 0;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${total.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">All time</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${monthlyTotal.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">
            {monthlyExpenses.length} expenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${avgExpense.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">Per expense</p>
        </CardContent>
      </Card>
    </div>
  );
}
