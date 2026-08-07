// src/utils/currency.ts

interface ExchangeRates {
  EUR: number;
  USD: number;
}

// Fallback na przypadek gdyby API banku miało przestój podczas buildu
const FALLBACK_RATES: ExchangeRates = {
  EUR: 4.25,
  USD: 3.90,
};

export async function fetchExchangeRates(): Promise<ExchangeRates> {
  try {
    // Pobieramy tabelę A z NBP
    const response = await fetch('https://api.nbp.pl/api/exchangerates/tables/A/?format=json', {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) throw new Error('Nie udało się pobrać kursów walut');

    const data = await response.json();
    const rates = data[0].rates;

    const eurRate = rates.find((r: any) => r.code === 'EUR')?.mid || FALLBACK_RATES.EUR;
    const usdRate = rates.find((r: any) => r.code === 'USD')?.mid || FALLBACK_RATES.USD;

    return { EUR: eurRate, USD: usdRate };
  } catch (error) {
    console.warn('Błąd pobierania kursów NBP, używam kursów zastępczych (fallback):', error);
    return FALLBACK_RATES;
  }
}

/**
 * Przelicza kwotę z PLN na docelową walutę i zaokrągla do ładnych setek (np. 18 200 -> 4 300 EUR)
 */
export function convertPLN(amountPLN: number, rate: number): number {
  const converted = amountPLN / rate;
  // Zaokrąglanie do najbliższych 100 dla czytelności w raportach pSEO
  return Math.round(converted / 100) * 100;
}

/**
 * Formatowanie waluty (np. 4 300 EUR lub $4,300)
 */
export function formatCurrency(amount: number, currency: 'EUR' | 'USD' | 'PLN', lang: 'pl' | 'en' = 'en'): string {
  return new Intl.NumberFormat(lang === 'en' ? 'en-US' : 'pl-PL', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}