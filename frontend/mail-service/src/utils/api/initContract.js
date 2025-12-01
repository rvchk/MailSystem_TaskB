export const initContract = async () => {
  const deployTransactionEntry = {
    fee: 0,
    image: "registry.rvchk.com/repositories/mail:1.0.0",
    imageHash:
      "0d37b9e191642fa15659d57b563ea5843481ce510a70e63163d2f98e2b38b521",
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
