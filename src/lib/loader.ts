import { axiosInstance } from "./axiosInstance";
import { redirect } from "react-router-dom";

export async function applicationsLoader() {

  try {
    const response = await axiosInstance.get("/api/deferment-applications");
    const { deferment_applications }: any = response.data;
    return deferment_applications;

  } catch (error: any) {
    if (error.response.status === 401) {
      return redirect("/login");
    }
    console.error(error);
  }
}

export async function systemInfoLoader() {
  try {
    const response = await axiosInstance.get("/api/system-properties");
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
