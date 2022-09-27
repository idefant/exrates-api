export const parseSymbolsQuery = (symbolsQuery: any) => {
  if (typeof symbolsQuery === 'string') {
    return new Set(symbolsQuery.toUpperCase().split(','));
  }
};
