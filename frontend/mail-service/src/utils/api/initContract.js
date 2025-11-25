export const initContract = async () => {
  const deployTransactionEntry = {
    fee: 0,
    image: "registry.rvchk.com/repositories/mail:1.0.0",
    imageHash:
      "ad822adc2d46733183715a9fa09c93b740a676ba958ca377655a6dbc79fe131a",
    contractName: "confident",
    sender: "3NhwVMXmwNVRzN6KdwRP9RFMH79PwSpPnTF",
    password: "3YOrynRZCRmx7P71V9JFUg",
    params: [
      {
        type: "string",
        value: "init",
        key: "action",
      },
    ],
    type: 103,
    version: 2,
    feeAssetId: null,
  };

  try {
    const response = await fetch(
      "http://localhost:6862/transactions/signAndBroadcast",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(deployTransactionEntry),
      },
    );
    const data = await response.json();
    localStorage.setItem("confidentContractId", data.id);

    return data.id;
  } catch (error) {
    throw new Error("Не смог отправить запрос", error.message);
  }
};
