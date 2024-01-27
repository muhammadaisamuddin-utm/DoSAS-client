import axios from "axios";
import { useEffect } from "react";

export async function getApplications() {
  const response = await axios.get(
    "https://api.dosas.online/api/deferment-applications",
    { withCredentials: true }
  );

  const { deferment_applications }: any = response;
  console.log(response);
  console.log(deferment_applications);

  return deferment_applications;
}

export default function Test() {
  useEffect(() => {
    getApplications();
  }, []);

  return <>ldjflak</>;
}
