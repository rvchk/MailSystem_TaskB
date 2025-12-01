export const sendTransaction = async (functionName, data) => {

  const args = Object.entries(data).map(([key, value]) => ({
    type: typeof value == "number" ? "integer" : "string",
    key: key,
    value: value,
  }));

  console.log(args)

  const transaction = {
    contractId: localStorage.getItem("confidentContractId"),
    fee: 0,
    type: 104,
    params: [
      {
        type: "string",
        value: functionName,
        key: "action",
      },
      ...args
    ],
    version: 2,
    sender: "3NhwVMXmwNVRzN6KdwRP9RFMH79PwSpPnTF",
    password: "3YOrynRZCRmx7P71V9JFUg",
    contractVersion: 1,
  };

  const response = await fetch(
    "http://localhost:6862/transactions/signAndBroadcast",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(transaction),
    },
  );

  if (!response.ok) throw new Error(`Ошибка: транзакции`);

  return await response.json();
};
