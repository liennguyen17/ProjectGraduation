import { handleFilterMasterData } from "../../../service/utils";

export const ColumnDetailTopicStudent = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
  },
  {
    title: "Học kỳ",
    dataIndex: "semester",
  },
  {
    title: "Họ tên sinh viên",
    dataIndex: ["student", "name"],
  },
  {
    title: "Mã sinh viên",
    dataIndex: ["student", "userCode"],
  },
  {
    title: "Đề tài khóa luận",
    dataIndex: "nameTopic",
  },

  {
    title: "Bộ môn quản lý",
    dataIndex: "departmentManagement",
    valueType: "select",
    request: () => handleFilterMasterData("subject"),
  },
  {
    title: "Tên cơ sở thực tập",
    dataIndex: "nameInternshipFacility",
    // align: "center",
    // width: "10%",
    hideInSearch: true,
  },
  {
    title: "Cán bộ hướng dẫn tại cơ sở thực tập",
    dataIndex: "menterInternshipFacility",
    align: "center",
    // width: "7%",
    hideInSearch: true,
  },
  {
    title: "Số điện thoại cán bộ hướng dẫn tại cơ sở thực tập",
    dataIndex: "phoneInstructorInternshipFacility",
    align: "center",
    // width: "7%",
    hideInSearch: true,
  },
  //   {
  //     title: "Ngày tạo",
  //     dataIndex: "createAt",
  //     align: "center",
  //     hideInSearch: true,
  //   },
  //   {
  //     title: "Ngày cập nhật",
  //     dataIndex: "updateAt",
  //     align: "center",
  //     hideInSearch: true,
  //   },
];
