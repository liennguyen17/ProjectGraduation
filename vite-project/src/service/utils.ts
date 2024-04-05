import { MasterDataFilterApi } from "./api";

export const handleFilterMasterData = async (keywords: string) => {
  try {
    const data = await MasterDataFilterApi(keywords);
    return data.map((data: any) => ({
      label: data.name,
      value: data.id,
    }));
  } catch (error) {
    console.error(`Error fetching data for ${keywords}:`, error);
    return [];
  }
};
