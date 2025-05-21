import { Button } from "~/components/ui/button";
import { Plus } from "lucide-react";

export default function Categories() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Groceries', 'Rent', 'Utilities', 'Entertainment', 'Transportation', 'Dining'].map((category) => (
          <div key={category} className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">{category}</h3>
              <span className="text-sm text-muted-foreground">$0.00</span>
            </div>
            <div className="h-2 bg-muted rounded-full mt-2 overflow-hidden">
              <div 
                className="h-full bg-primary" 
                style={{ width: `${Math.floor(Math.random() * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
