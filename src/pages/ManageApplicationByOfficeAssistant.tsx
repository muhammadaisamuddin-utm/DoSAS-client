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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getFormattedDate } from "@/lib/date";
import { Loading } from "@/components/loading";

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
  comment: z.string(),
  action: z.string(),
  // others: z.string(),
  pdf_file: z.any(),
});

const actions = [
  { value: "reject", label: "REJECT" },
  { value: "check", label: "CHECK" },
  { value: "approve", label: "APPROVE" },
];

function ManageApplicationByOfficeAssistant() {
  let { id } = useParams();
  const applications: any = useLoaderData();
  let application: any;
  if (id) application = applications[id];

  const [fileUpload, setFileUpload] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [rejectionReason, setRejectionReason] = useState("");
  const [comment, setComment] = useState("");
  const [action, setAction] = useState("");

  const { toast } = useToast();

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
      comment: "",
      other: "",
    },
  });

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

      toast({
        variant: "default",
        description: "The deferment application has been rejected",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Unable to reject application",
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
      link.setAttribute(
        "download",
        `${application.semester_code}_${
          application.userid
        }_${getFormattedDate()}.pdf`
      );
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Unable to download file",
      });
    }
  };

  const handleBack = (e: any) => {
    e.preventDefault();
    navigate("/home");
  };

  const handleCheck = async (e: any) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("action", "check");

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
      console.log(error);

      toast({
        variant: "destructive",
        description: "Unable to check application",
      });
    }
  };

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    setFileUpload(e.target.files[0]);
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
        description: "The deferment application has been approved",
      });

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      console.log(error);

      toast({
        variant: "destructive",
        description: "Unable to approve application",
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (action === "check") {
      await handleCheck(e);
    } else if (action === "reject") {
      await handleReject(e);
    } else if (action === "approve") {
      await handleApprove(e);
    }
    setLoading(false);
  };

  const isActionAllowed = (action: string, status: string) => {
    if (action === "approve" && status === "pending") return false;
    if (action === "check" && status === "pending_approval") return false;
    return true;
  };

  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="flex relative items-center">
          <Button className="z-40 w-20 h-8" onClick={(e) => handleBack(e)}>
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
                  className="bg-gray-100 font-bold capitalize"
                  value={
                    application.reason === "other"
                      ? application.others
                      : application.reason
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

        <Button variant="secondary" onClick={handleDownloadFile}>
          Download Deferment Application Form
        </Button>

        {/* action */}
        <FormField
          control={form.control}
          name="action"
          render={() => (
            <FormItem>
              <FormLabel>Action</FormLabel>
              <Select
                onValueChange={(e) => {
                  setAction(e);
                }}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an action" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {actions.map((action) => {
                    return (
                      <SelectItem
                        key={action.value}
                        value={action.value}
                        disabled={!isActionAllowed(
                          action.value,
                          application.status
                        )}
                      >
                        {action.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {action === "reject" && (
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
        )}

        {action === "approve" && (
          <div>
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

            <div className="my-4 py-2">
              <FormLabel>Upload Approval Proof</FormLabel>
              <Input id="pdf_file" type="file" onChange={handleFileUpload} />
            </div>
          </div>
        )}

        <Button
          className="text-right w-full mx-1"
          onClick={(e) => handleSubmit(e)}
          disabled={action === ""}
        >
          Submit
        </Button>
        <Toaster />
        {loading && <Loading />}
      </form>
    </Form>
  );
}

export default ManageApplicationByOfficeAssistant;
