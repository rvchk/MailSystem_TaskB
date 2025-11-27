export const sendTransaction = async (functionName, data) => {

  const args = Object.entries(data).map(([key, value]) => ({
    type: typeof value,
    key: key,
    value: value,
  }));

  console.log(args)

  const contractId = localStorage.getItem("confidentContractId");
  const transaction = {
    contractId: contractId,
    fee: 0,
    type: 104,
    params: [
      {
        type: "string",
        value: functionName,
        key: "action",
      },
      ...args.map((param) => ({
        type: param.type,
        key: param.key,
        value: param.value,
      })),
    ],
    version: 2,
    sender: "3NhwVMXmwNVRzN6KdwRP9RFMH79PwSpPnTF",
    password: "3YOrynRZCRmx7P71V9JFUg",
    contractVersion: 1,
  };

  try {
    const response = await fetch(
      "http://localhost:6862/transactions/signAndBroadcast",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(transaction),
      },
    );
    console.log(response)

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Ошибка: ${response.status} - ${errorData.message}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Ошибка при отправке транзакции:", error);
    throw error;
  }
};
