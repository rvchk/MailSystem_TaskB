export const getContractData = async (contractId) => {
  try {
    const response = await fetch("http://localhost:6862/contracts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: {
        contracts: [contractId],
      },
    });

    const contractData = await response.json();
    const contractKey = Object.keys(contractData)[0];

    return {
      data: contractData,
      key: contractKey,
    };
  } catch (error) {
    throw new Error("Ошибка при получении данных контракта", error.message);
  }
};