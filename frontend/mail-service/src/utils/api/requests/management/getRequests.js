import { getContractData } from "../../getContractData";

export const getRequests = async () => {
  try {
    const contract = await getContractData();

    const requestsArray = contract[contract.key].filter((item) =>
      item.key.startsWith("REQUESTS"),
    );
    const parsedRequests = requestsArray.map((item) => JSON.parse(item.value));

    return parsedRequests;
  } catch (error) {
    throw new Error("Ошибка при получении данных стартапа", error.message);
  }
};
