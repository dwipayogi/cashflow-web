import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { WalletCards } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background to-muted">
      <div className="container flex flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <WalletCards className="h-16 w-16 text-primary" />
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Money Manager
        </h1>
        <p className="text-lg text-muted-foreground">
          Take control of your finances with our intuitive money management platform
        </p>
        <Link href="/dashboard">
          <Button size="lg">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}