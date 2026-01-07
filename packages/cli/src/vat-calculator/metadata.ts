export const metadata = {
  name: 'vat-calculator',
  description: 'Calculate VAT (Value Added Tax) - add or remove VAT',
  category: 'finance',
};

export const VAT_INFO = {
  title: 'VAT Calculator',
  description:
    'Calculate Value Added Tax (VAT) for different countries and rates. Add VAT to a net amount or remove VAT from a gross amount.',
  useCases: [
    'Add VAT to net prices for invoicing',
    'Remove VAT from gross prices to find net amount',
    'Support multiple VAT rates (standard, reduced, zero)',
  ],
};

export const COMMON_VAT_RATES = [
  { name: 'UK Standard', rate: 20, countries: ['United Kingdom'] },
  { name: 'UK Reduced', rate: 5, countries: ['United Kingdom'] },
  { name: 'EU Standard (Germany, France)', rate: 19, countries: ['Germany', 'France'] },
  { name: 'EU Standard (Spain, Italy)', rate: 21, countries: ['Spain', 'Italy'] },
  { name: 'EU Standard (Ireland)', rate: 23, countries: ['Ireland'] },
  { name: 'EU Reduced', rate: 10, countries: ['EU Countries'] },
  { name: 'Switzerland', rate: 8.1, countries: ['Switzerland'] },
  { name: 'Norway', rate: 25, countries: ['Norway'] },
  { name: 'Australia GST', rate: 10, countries: ['Australia'] },
  { name: 'Canada GST', rate: 5, countries: ['Canada'] },
  { name: 'New Zealand GST', rate: 15, countries: ['New Zealand'] },
];
