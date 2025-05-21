import { useLoaderData } from "react-router";
import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";

const transactions = [
  { id: 1, date: '2025-05-21', description: 'Grocery Shopping', category: 'Food', amount: -125.50 },
  { id: 2, date: '2025-05-20', description: 'Salary', category: 'Income', amount: 3000 },
  { id: 3, date: '2025-05-18', description: 'Electric Bill', category: 'Bills', amount: -75.25 },
  { id: 4, date: '2025-05-15', description: 'Internet Bill', category: 'Bills', amount: -64.99 },
  { id: 5, date: '2025-05-10', description: 'Restaurant', category: 'Food', amount: -42.75 },
];

export async function loader() {
  // TODO: Fetch transactions from API
  return { transactions };
}

export default function Transactions() {
  const { transactions } = useLoaderData();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Transactions</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Transaction
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction: any) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>
                  <span className="px-2 py-1 text-xs rounded-full bg-muted">
                    {transaction.category}
                  </span>
                </TableCell>
                <TableCell 
                  className={`text-right font-medium ${
                    transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {transaction.amount >= 0 ? '+' : ''}{transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
