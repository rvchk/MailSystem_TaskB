export const createTransactionParams = (data) => {
  Object.entries(data).map(([key, value]) => ({
    type: typeof value,
    key: key,
    value: value.toString(),
  }));
};