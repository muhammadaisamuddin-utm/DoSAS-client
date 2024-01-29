import { axiosInstance } from "./axiosInstance";

export async function applicationsLoader() {
  try {
    const response = await axiosInstance.get(
      "/api/deferment-applications"
    );
    const { deferment_applications }: any = response.data;
    return deferment_applications;
  } catch (error) {
    console.error(error);
    return null;
  }
}