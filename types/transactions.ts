export interface Transaction {
  id: number
  type: 'income' | 'expense'
  amount: number
  description: string
  date: string
  category?: string
}

