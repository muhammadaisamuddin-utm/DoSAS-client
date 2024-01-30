export const getStatusColor = (status: string) => {
  switch (status) {
    case "rejected":
    case "terminated":
      return "red";
    case "submitted":
    case "pending":
    case "pending_approval":
      return "blue";
    case "approved":
    case "endorsed1":
    case "endorsed2":
    case "checked":
      return "green";
    case "expired":
      return "gray";
    default:
      return "black";
  }
};
