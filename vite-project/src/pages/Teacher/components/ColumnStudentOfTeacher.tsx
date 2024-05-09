export const ColumnStudentOfTeacher = [
  {
    title: "ID",
    dataIndex: "id",
    hideInTable: true,
  },
  {
    title: "Kỳ học",
    dataIndex: "semester",
  },
  {
    title: "Trạng thái đề tài",
    dataIndex: "status",
  },
  {
    title: "Đề tài khóa luận",
    dataIndex: "nameTopic",
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
