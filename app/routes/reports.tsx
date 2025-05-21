import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export default function Reports() {
  const spendingByCategory = [
    { name: 'Housing', amount: 1200, percentage: 40 },
    { name: 'Food', amount: 600, percentage: 20 },
    { name: 'Transportation', amount: 300, percentage: 10 },
    { name: 'Entertainment', amount: 300, percentage: 10 },
    { name: 'Utilities', amount: 250, percentage: 8 },
    { name: 'Other', amount: 350, percentage: 12 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Track and analyze your spending</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Spending by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {spendingByCategory.map((category) => (
                <div key={category.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{category.name}</span>
                    <span>${category.amount}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary" 
                      style={{ width: `${category.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between pt-4">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = Math.floor(Math.random() * 100) + 20;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div 
                      className="w-8 bg-primary rounded-t-sm"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs mt-2 text-muted-foreground">
                      {new Date(0, i).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
