import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Check, Star } from 'lucide-react'
import ModeToggle from '@/components/ThemeToggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-blue-500 to-purple-600 dark:from-blue-900 dark:to-purple-900 text-white">
      <header className="container mx-auto py-6">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Cashflow</h1>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <Button asChild variant="ghost">
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Register</Link>
            </Button>
          </div>
        </nav>
      </header>

      <main className="flex-grow container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-6">Welcome to Cashflow</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your personal finance companion, helping you track expenses,
            manage income, and gain insights into your financial health.
          </p>
          <Button asChild size="lg">
            <Link href="/register">Get Started</Link>
          </Button>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Features</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              title="Expense Tracking"
              description="Easily log and categorize your expenses to understand your spending habits."
            />
            <FeatureCard
              title="Income Management"
              description="Keep track of all your income sources in one place."
            />
            <FeatureCard
              title="Financial Insights"
              description="Get visual representations of your financial data to make informed decisions."
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">User Reviews</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <ReviewCard
              name="John Doe"
              review="Cashflow has completely changed how I manage my finances. Highly recommended!"
              rating={5}
            />
            <ReviewCard
              name="Jane Smith"
              review="The insights provided by Cashflow have helped me save money and plan for the future."
              rating={4}
            />
            <ReviewCard
              name="Mike Johnson"
              review="Easy to use and packed with features. It's become an essential tool for me."
              rating={5}
            />
          </div>
        </section>

        <section className="mb-16">
          <h3 className="text-3xl font-bold mb-8 text-center">Pricing</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Basic"
              price="Free"
              features={[
                "Expense tracking",
                "Income management",
                "Basic insights",
              ]}
            />
            <PricingCard
              title="Pro"
              price="$9.99/month"
              features={[
                "All Basic features",
                "Advanced insights",
                "Budget planning",
                "Financial goals",
              ]}
            />
            <PricingCard
              title="Enterprise"
              price="Contact us"
              features={[
                "All Pro features",
                "Team collaboration",
                "API access",
                "Dedicated support",
              ]}
            />
          </div>
        </section>
      </main>

      <footer className="container mx-auto py-6 text-center">
        <p className="text-sm opacity-75">
          © 2023 Cashflow. All rights reserved.
        </p>
      </footer>
    </div>
  )
}

function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="bg-white/10 border-white/20 text-white dark:bg-gray-800/30 dark:border-gray-700/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white/80 dark:text-gray-300">{description}</CardDescription>
      </CardContent>
    </Card>
  )
}

function ReviewCard({ name, review, rating }: { name: string; review: string; rating: number }) {
  return (
    <Card className="bg-white/10 border-white/20 text-white dark:bg-gray-800/30 dark:border-gray-700/30">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <div className="flex">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-5 h-5 fill-current text-yellow-400" />
          ))}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-white/80 dark:text-gray-300">{review}</CardDescription>
      </CardContent>
    </Card>
  )
}

function PricingCard({ title, price, features }: { title: string; price: string; features: string[] }) {
  return (
    <Card className="bg-white/10 border-white/20 text-white dark:bg-gray-800/30 dark:border-gray-700/30">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-white/80 dark:text-gray-300 text-2xl font-bold">{price}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="w-5 h-5 mr-2 text-green-400" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

