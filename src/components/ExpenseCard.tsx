import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useDeleteExpense, type Expense } from '@/hooks/useExpenses';
import { format } from 'date-fns';

interface ExpenseCardProps {
  expense: Expense;
}

export function ExpenseCard({ expense }: ExpenseCardProps) {
  const deleteExpense = useDeleteExpense();

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 flex-1">
            <div 
              className="text-2xl w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: `${expense.expense_categories.color}20` }}
            >
              {expense.expense_categories.icon}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold truncate">{expense.description}</h3>
              <p className="text-sm text-muted-foreground">
                {expense.expense_categories.name}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {format(new Date(expense.expense_date), 'MMM dd, yyyy')}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold text-lg whitespace-nowrap">
              ${expense.amount.toFixed(2)}
            </p>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => deleteExpense.mutate(expense.id)}
              disabled={deleteExpense.isPending}
            >
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
