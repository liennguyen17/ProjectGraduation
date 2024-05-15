import {
  MasterDataFilterApi,
  StudentGetListData,
  TeacherGetListData,
  getListTopicCommentStudentOfTeacher,
} from "./api";
import Cookies from "js-cookie";
import { TopicType } from "./types";

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
    console.log("data teacher:: ", dataTeacher);
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

export const handleFilterStudentComment = async () => {
  try {
    const data = await getListTopicCommentStudentOfTeacher();
    console.log("data:: ", data);

    return data.map((data: TopicType) => ({
      label: `${data.student.name} - ${data.student.userCode}`,
      value: data.id,
    }));
  } catch (error) {
    console.error("Error student data:", error);
    return [];
  }
};

export const saveCredentialCookie = ({
  accessToken,
  expires,
}: {
  accessToken: string;
  expires?: number | Date;
}) => {
  Cookies.set("access_token", accessToken || "", {
    expires: expires,
  });
};

export const clearCredentialCookie = ({ name }: { name: string }) => {
  Cookies.remove(name);
};

export const getJwt = () => {
  const jwt = Cookies.get("access_token");
  return jwt;
};
