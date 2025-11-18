import { getContractData } from "../../getContractData"

export const getUsers = async (contractId) => {
  try {
    const contract = await getContractData(contractId);
    
    const usersArray = contract.data[contract.key].filter((item) =>
      item.key.startsWith("USERS"),
  );

    const parsedUsers = usersArray.map((item) => JSON.parse(item.value));
    return parsedUsers;
  } catch (error) {
    throw new Error("Ошибка при получении данных стартапа", error.message);
  }
};