export const createTransactionParams = (data) => {
  return Object.entries(data).map(([key, value]) => ({
    type: typeof value,
    key: key,
    value: value.toString(),
  }));
};