export const initContract = async () => {
  const deployTransactionEntry = {
    fee: 0,
    image: "registry.rvchk.com/repositories/mail:1.0.0",
    imageHash:
      "c686d5b823b54e4d2ab2d510fad6ecf5b15b24ccda420d645527be33626bd1de",
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
