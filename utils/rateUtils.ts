export const filterRates = (rates: Record<string, number>, symbols?: Set<string>) => (
  Object.entries(rates).reduce(
    (acc: Record<string, number>, [symbol, price]) => {
      if (!symbols || symbols.has(symbol)) {
        acc[symbol] = price;
      }
      return acc;
    },
    {},
  )
);
