import { getContractData } from "../../getContractData"

export const getParcels = async (contractId) => {
  try {
    const contract = await getContractData(contractId);

    const parcelsArray = contract.data[contract.key].filter((item) =>
      item.key.startsWith("PARCELS"),
    );

    const parsedUsers = parcelsArray.map((item) => JSON.parse(item.value));
    return parsedUsers;
  } catch (error) {
    throw new Error("Ошибка при получении данных стартапа", error.message);
  }
};