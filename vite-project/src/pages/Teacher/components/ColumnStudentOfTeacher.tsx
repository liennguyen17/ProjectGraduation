export const ColumnStudentOfTeacher = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
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
    title: "Email",
    dataIndex: ["student", "email"],
  },
  {
    title: "Số điện thoại",
    dataIndex: ["student", "phone"],
  },

  {
    title: "Lớp",
    dataIndex: ["student", "className"],
  },
];
