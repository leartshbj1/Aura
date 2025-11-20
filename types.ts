export enum CurrencyType {
  FIAT = 'FIAT',
  CRYPTO = 'CRYPTO'
}

export enum CurrencyCode {
  EUR = 'EUR',
  CHF = 'CHF',
  ETH = 'ETH',
  USDC = 'USDC',
  MATIC = 'MATIC'
}

export enum TransactionCategory {
  SALES = 'Sales',
  SERVICE = 'Service',
  TVA = 'TVA',
  SALARIES = 'Salaries',
  SOFTWARE = 'Software',
  UNCATEGORIZED = 'Uncategorized'
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  currency: CurrencyCode;
  type: CurrencyType;
  category: TransactionCategory | string;
  hash?: string; // For crypto
  status: 'pending' | 'completed';
}

export interface WalletState {
  isConnected: boolean;
  address: string | null;
  balanceEth: number;
}

export interface DashboardStats {
  totalBalanceEUR: number;
  fiatBalanceEUR: number;
  cryptoBalanceEUR: number;
  monthlyBurnRate: number;
}