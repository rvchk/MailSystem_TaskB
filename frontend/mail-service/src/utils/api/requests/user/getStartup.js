import { getContractData } from "../../getContractData"
export const getStartup = async (startupAddress) => {
  try {
    const contract = await getContractData();

    const startupInfo = contract.data[contract.key].find(
      (item) => item.key === `STARTUPS_${startupAddress}`,
    ).value;
    return JSON.parse(startupInfo);
  } catch (error) {
    throw new Error("Ошибка при получении данных стартапа", error.message);
  }
};
