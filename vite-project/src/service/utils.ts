import {
  MasterDataFilterApi,
  StudentGetListData,
  TeacherGetListData,
} from "./api";

export const handleFilterMasterData = async (keywords: string) => {
  try {
    const data = await MasterDataFilterApi(keywords);
    return data.map((data: any) => ({
      label: data.name,
      value: data.name,
    }));
  } catch (error) {
    console.error(`Error fetching data for ${keywords}:`, error);
    return [];
  }
};

export const handleFilterTeacher = async () => {
  try {
    const dataTeacher = await TeacherGetListData();
    // console.log("data:: ", dataTeacher);
    return dataTeacher.map((data: any) => ({
      label: `${data.name} - ${data.userCode}`,
      value: data.id,
    }));
  } catch (error) {
    console.error("Error fetching teacher data:", error);
    return [];
  }
};

export const handleFilterStudent = async () => {
  try {
    const data = await StudentGetListData();
    // console.log("data:: ", data);
    return data.map((data: any) => ({
      label: `${data.name} - ${data.userCode}`,
      value: data.id,
    }));
  } catch (error) {
    console.error("Error student data:", error);
    return [];
  }
};
