import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";

const routes = [
  { name: "Dashboard", path: "/dashboard" },
  { name: "Transactions", path: "/transactions" },
  { name: "Categories", path: "/categories" },
  { name: "Reports", path: "/reports" },
];

export function MainNav() {
  const { pathname } = useLocation();

  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === route.path
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {route.name}
        </Link>
      ))}
    </nav>
  );
}
