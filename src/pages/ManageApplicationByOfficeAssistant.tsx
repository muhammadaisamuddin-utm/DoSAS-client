import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Link, useLoaderData, useNavigate, useParams } from "react-router-dom";

import local_deferment_pdf from "../assets/UTMAMD01-Penangguhan-Pengajian-Pelajar-Tempatan-Pindaan-2022.pdf";
import { axiosInstance } from "@/lib/axiosInstance";

const formSchema = z.object({
  name: z.string(),
  identity_no: z.string(),
  userid: z.string(),
  program_code: z.string(),
  program_name: z.string(),
  faculty: z.string(),
  current_semester: z.number().optional(),
  deferment_reason: z.string(),
  other: z.string(),
  main_supervisor: z.string(),
  co_supervisor: z.string().optional(),
  nationality: z.string(),
  proposal_defense: z.boolean().optional(),
  nht_completion_status: z.boolean().optional(),
  rejection_reason: z.string(),
  // others: z.string(),
  pdf_file: z.any(),
});

// const reasons = [
//   {
//     value: "some information in deferment application form is not available",
//     label: "Some information in deferment application form is not available",
//   },
//   { value: "missing medical report", label: "Missing medical report" },
//   { value: "missing offical letter", label: "Missing official letter" },
//   { value: "missing signatures", label: "Missing signatures" },
//   { value: "others", label: "Others" },
// ];

function ManageApplicationByOfficeAssistant() {
  let { id } = useParams();
  const applications: any = useLoaderData();
  let application: any;
  if (id) application = applications[id];

  const [rejectionReason, setRejectionReason] = useState("");

  // const [isOther, setIsOther] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      identity_no: "",
      userid: "",
      program_code: "",
      program_name: "",
      faculty: "",
      current_semester: undefined,
      deferment_reason: "",
      main_supervisor: "",
      co_supervisor: "",
      nationality: "",
      proposal_defense: undefined,
      nht_completion_status: undefined,
      rejection_reason: "",
      other: "",
    },
  });

  // const [value, setValue] = useState("");

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   console.log(values);
  // }

  const navigate = useNavigate();

  const handleReject = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("rejection_reason", rejectionReason);
    formData.append("action", "reject");

    const response = await axiosInstance.post(
      `/api/deferment-application/${id}/manage`,
      formData
    );
    console.log(response);
  };

  const handleCheck = async (e: any) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("action", "check");

    const response = await axiosInstance.post(
      `/api/deferment-application/${id}/manage`,
      formData
    );
    console.log(response);
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="flex relative items-center">
          <Button
            className="z-40 w-20 h-8"
            onClick={(e) => {
              e.preventDefault();
              navigate("/home");
            }}
          >
            Back
          </Button>
          <span className="absolute mx-auto w-full text-center font-bold">
            Manage Student Deferment Application
          </span>
        </div>
        <div className="w-full flex space-x-4 justify-between">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <FormItem>
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.name}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* identity_no */}
          <FormField
            control={form.control}
            name="identity_no"
            render={() => (
              <FormItem>
                <FormLabel className="">IC/ISID</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.identity_no}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* matric card */}
          <FormField
            control={form.control}
            name="userid"
            render={() => (
              <FormItem>
                <FormLabel className="">Student ID</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.userid}
                    disabled
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex space-x-2 justify-between">
          {/* program_code */}
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="program_code"
              defaultValue="" //
              render={() => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.program_code}
                    disabled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* program_name */}
          <div className="w-3/4">
            <FormField
              control={form.control}
              name="program_name"
              defaultValue="" //
              render={() => (
                <FormItem>
                  <FormLabel className="">Program Name</FormLabel>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.program_name}
                    disabled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="w-full flex space-x-2 justify-between">
          {/* faculty */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="faculty"
              render={() => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.faculty_name}
                    disabled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* current_semester */}
          <div className="w-full">
            <FormField
              control={form.control}
              name="current_semester"
              render={() => (
                <FormItem>
                  <FormLabel>Current Semester</FormLabel>
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.semester_name}
                    disabled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* deferment reason */}
        <FormField
          control={form.control}
          name="deferment_reason"
          render={() => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 font-bold"
                  value={
                    application.reason === "other"
                      ? application.reason
                      : application.others
                  }
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* main_supervisor */}
        <FormField
          control={form.control}
          name="main_supervisor"
          render={() => (
            <FormItem>
              <FormLabel>Main Supervisor</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 font-bold"
                  value={application.main_supervisor}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* co_supervisor */}
        <FormField
          control={form.control}
          name="co_supervisor"
          render={() => (
            <FormItem>
              <FormLabel>Co-Supervisor</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input
                    className="bg-gray-100 font-bold"
                    value={application.co_supervisor}
                    disabled
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* nationality */}
        <FormField
          control={form.control}
          name="nationality"
          render={() => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 font-bold"
                  value={application.nationality}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* proposal_defense */}
        <FormField
          control={form.control}
          name="proposal_defense"
          render={() => (
            <FormItem>
              <FormLabel>Proposal Defense</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 font-bold"
                  value={application.proposal_defence_status}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* nht_completion_status */}
        <FormField
          control={form.control}
          name="nht_completion_status"
          render={() => (
            <FormItem>
              <FormLabel>NHT Completion Status</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100 font-bold"
                  value={application.nht_completion_status}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* rejection reason */}
        <FormField
          control={form.control}
          name="rejection_reason"
          render={(field) => (
            <FormItem>
              <FormLabel>Rejection Reason</FormLabel>
              <FormControl>
                <Input
                  className="font-bold"
                  {...field}
                  onChange={(e) => {
                    e.preventDefault();
                    setRejectionReason(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary">
          <Link
            to={local_deferment_pdf} // need to change this
            download="UTMAMD01-Penangguhan-Pengajian-Pelajar-Tempatan-Pindaan-2022.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Download Student Deferment Application Form
          </Link>
        </Button>

        {/* rejection reason */}
        {/* <FormField
          control={form.control}
          name="rejection_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rejection Reason</FormLabel>
              <Select
                onValueChange={(e) => {
                  field.onChange(e);
                  if (e === "others") {
                    setIsOther(true);
                  } else {
                    setIsOther(false);
                  }
                }}
                // defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a deferment reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {reasons.map((reason) => {
                    return (
                      <SelectItem key={reason.value} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {isOther && (
          // others
          <FormField
            control={form.control}
            name="other"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Other Reason</FormLabel>
                <FormControl>
                  <Input className="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )} */}

        <div className="flex w-full justify-around">
          <Button
            variant="destructive"
            className="text-right bg-red-500 w-full mx-1"
            type="submit"
            onClick={(e) => handleReject(e)}
          >
            Reject
          </Button>
          <Button
            variant="default"
            className="text-right bg-green-700 w-full mx-1"
            type="submit"
            onClick={(e) => handleCheck(e)}
          >
            Check
          </Button>
        </div>

        {/* {value === "" ? (
          <div className="flex w-full justify-around">
            <Button
              disabled
              variant="destructive"
              className="text-right bg-gray-500 w-full mx-1"
            >
              Reject
            </Button>
            <Button
              variant="default"
              className="text-right bg-green-700 w-full mx-1"
              type="submit"
            >
              Check
            </Button>
          </div>
        ) : (
          <div className="flex w-full justify-around">
            <Button
              variant="destructive"
              className="text-right bg-red-500 w-full mx-1"
              type="submit"
            >
              Reject
            </Button>
            <Button
              disabled
              variant="default"
              className="text-right bg-gray-700 w-full mx-1"
            >
              Check
            </Button>
          </div>
        )} */}
      </form>
    </Form>
  );
}

export default ManageApplicationByOfficeAssistant;
