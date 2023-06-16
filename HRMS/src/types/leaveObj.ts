export default interface Leave {
  fromEmail: string;
  toEmail: string;
  type: "Leave Type" | "planned" | "unPlanned";
  startDate: Date | string;
  endDate: Date |string;
  reason: string;
  uid: string;
  status: "Pending" | "Approved" | "Canceled" | "Rejected";
}
