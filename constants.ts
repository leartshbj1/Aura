import { Transaction, CurrencyCode, CurrencyType, TransactionCategory } from './types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-101',
    date: '2023-10-25',
    description: 'Stripe Payout #8821',
    amount: 4500.00,
    currency: CurrencyCode.EUR,
    type: CurrencyType.FIAT,
    category: TransactionCategory.SALES,
    status: 'completed'
  },
  {
    id: 'tx-102',
    date: '2023-10-26',
    description: 'AWS EMEA SARL',
    amount: -245.50,
    currency: CurrencyCode.EUR,
    type: CurrencyType.FIAT,
    category: TransactionCategory.SOFTWARE,
    status: 'completed'
  },
  {
    id: 'tx-103',
    date: '2023-10-27',
    description: 'Client Invoice #4002 - Smart Contract Audit',
    amount: 2.5,
    currency: CurrencyCode.ETH,
    type: CurrencyType.CRYPTO,
    category: TransactionCategory.SERVICE,
    hash: '0x71c...9a2',
    status: 'completed'
  },
  {
    id: 'tx-104',
    date: '2023-10-28',
    description: 'Payroll October',
    amount: -12000.00,
    currency: CurrencyCode.CHF,
    type: CurrencyType.FIAT,
    category: TransactionCategory.SALARIES,
    status: 'completed'
  },
  {
    id: 'tx-105',
    date: '2023-10-29',
    description: 'Gas Fees',
    amount: -0.004,
    currency: CurrencyCode.ETH,
    type: CurrencyType.CRYPTO,
    category: TransactionCategory.UNCATEGORIZED,
    hash: '0x99b...1z9',
    status: 'completed'
  }
];

// Simple conversion rates for MVP
export const EXCHANGE_RATES = {
  [CurrencyCode.EUR]: 1,
  [CurrencyCode.CHF]: 1.05, // 1 CHF = 1.05 EUR
  [CurrencyCode.ETH]: 2500, // 1 ETH = 2500 EUR
  [CurrencyCode.USDC]: 0.92, // 1 USDC = 0.92 EUR
  [CurrencyCode.MATIC]: 0.65 // 1 MATIC = 0.65 EUR
};

export const CHART_DATA_MOCK = [
  { name: 'Jan', fiat: 40000, crypto: 24000, total: 64000 },
  { name: 'Feb', fiat: 35000, crypto: 28000, total: 63000 },
  { name: 'Mar', fiat: 42000, crypto: 35000, total: 77000 },
  { name: 'Apr', fiat: 48000, crypto: 32000, total: 80000 },
  { name: 'May', fiat: 55000, crypto: 45000, total: 100000 },
  { name: 'Jun', fiat: 51000, crypto: 48000, total: 99000 },
];