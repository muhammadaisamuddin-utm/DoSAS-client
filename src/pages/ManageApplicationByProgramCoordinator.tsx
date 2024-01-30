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
import { useLoaderData, useNavigate, useParams } from "react-router-dom";

import { axiosInstance } from "@/lib/axiosInstance";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/components/ui/use-toast";
import { getStatusColor } from "@/lib/statusColor";

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
  rejection_reason: z.string().optional(),
  comment: z.string().optional(),
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

function ManageApplicationByProgramCoordinator() {
  let { id } = useParams();
  const applications: any = useLoaderData();
  let application: any;
  if (id) application = applications[id];

  const { toast } = useToast();

  const [fileUpload, setFileUpload] = useState<any>(null);

  const [comment, setComment] = useState("");
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
      comment: "",
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

    try {
      const formData = new FormData();
      formData.append("rejection_reason", rejectionReason);
      formData.append("action", "reject");

      await axiosInstance.post(
        `/api/deferment-application/${application.id}/manage`,
        formData
      );
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Error handling request",
      });
    }
  };

  const handleDownloadFile = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axiosInstance.post(
        `/api/deferment-application/${application.id}/download`,
        { file_type: "form" },
        { responseType: "blob" }
      );

      console.log(response);

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Error handling request",
      });
    }
  };

  const handleApprove = async (e: any) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("comment", comment);
      formData.append("action", "approve");
      formData.append("approval_proof", fileUpload);

      await axiosInstance.post(
        `/api/deferment-application/${application.id}/manage`,
        formData
      );

      toast({
        variant: "default",
        description: "The deferment application has been checked",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Error handling request",
      });
    }
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    setFileUpload(e.target.files[0]);
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
        <div className="flex justify-center">
          <div className="text-xl font-bold uppercase">STATUS: &nbsp;</div>
          <div
            className={`text-xl font-bold uppercase text-${getStatusColor(
              application.status
            )}-500`}
          >
            {application.status}
          </div>
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
                  value={application.supervisor}
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

        {/* comment */}
        <FormField
          control={form.control}
          name="comment"
          render={(field) => (
            <FormItem>
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Input
                  className="font-bold"
                  {...field}
                  onChange={(e) => {
                    e.preventDefault();
                    setComment(e.target.value);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="secondary" onClick={handleDownloadFile}>
          Download Deferment Application Form
        </Button>

        <div className="my-4 py-2">
          <FormLabel>Upload Approval Proof</FormLabel>
          <Input id="pdf_file" type="file" onChange={handleFileUpload} />
        </div>

        {/* rejection reason */}
        {/* <FormField
          control={form.control}
          name="comment"
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
            onClick={(e) => handleApprove(e)}
          >
            Approve
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

        <Toaster />
      </form>
    </Form>
  );
}

export default ManageApplicationByProgramCoordinator;