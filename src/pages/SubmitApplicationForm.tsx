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
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import local_deferment_pdf from "../assets/UTMAMD01-Penangguhan-Pengajian-Pelajar-Tempatan-Pindaan-2022.pdf";
import intl_deferment_pdf from "../assets/UTMAMD02-Deferment-of-Study-International-Student-Amendment-2022.pdf";

const formSchema = z.object({
  name: z.string(),
  identity_no: z.string(),
  userid: z.string(),
  program_code: z.string(),
  program_name: z.string(),
  faculty: z.string(),
  current_semester: z.number(),
  // deferment_reason: z.string().optional(),
  deferment_reason: z.string(),
  other: z.string(),
  main_supervisor: z.string(),
  co_supervisor: z.string().optional(),
  nationality: z.string(),
  proposal_defense: z.boolean(),
  nht_completion_status: z.boolean(),
  pdf_file: z.any(),
});

const reasons = [
  // this one is not counted
  {
    value: "country/university reasons",
    label: "Interest of country or university",
  },
  { value: "natural disaster", label: "Natural Disaster" },
  { value: "war", label: "War" },
  { value: "health problems", label: "Health Problems" },

  // this one is counted
  { value: "financial problems", label: "Financial Problems" },
  { value: "personal problems", label: "Personal Problems" },
  { value: "work commitment", label: "Work Commitment" },
  { value: "others", label: "Others" },
];

function SubmitApplicationForm() {
  const navigate = useNavigate();

  const [isOther, setIsOther] = useState<boolean>(false);
  const [fileUpload, setFileUpload] = useState<any>(null);

  const { user } = useAuth();
  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaulvalues for form fields
    defaultValues: {
      name: parsedUser.name,
      identity_no: parsedUser.identity_no,
      userid: parsedUser.userid,
      program_code: parsedUser.program_code,
      program_name: parsedUser.program_name,
      faculty: parsedUser.faculty_name,
      current_semester: parsedUser.current_semester,
      nationality: parsedUser.nationality,
      deferment_reason: "",
      other: "",
      main_supervisor: parsedUser.supervisor,
      co_supervisor: parsedUser.co_supervisor,
      proposal_defense: parsedUser.proposal_defence_status,
      nht_completion_status: parsedUser.nht_completion_status,
    },
  });

  const handleFileUpload = (e: any) => {
    e.preventDefault();
    setFileUpload(e.target.files[0]);
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const formData = new FormData();
      formData.append("reason", values.deferment_reason);
      formData.append("others", values.other);
      // formData.append("pdf_form", values.pdf_file);
      formData.append("pdf_form", fileUpload);

      console.log(fileUpload);

      const response = await axios.post(
        "https://api.dosas.online/api/deferment-application",
        // "http//localhost:8000/api/deferment-application",
        formData,
        { withCredentials: true }
      );
      console.log(response);
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
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
            Submit Student Deferment Application
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
                    className="bg-gray-100"
                    value={parsedUser.name}
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
                    className="bg-gray-100"
                    value={parsedUser.identity_no}
                    disabled
                  />
                </FormControl>
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
                    className="bg-gray-100"
                    value={parsedUser.userid}
                    disabled
                  />
                </FormControl>
                {/* <FormMessage /> */}
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
              render={() => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Input
                    className="bg-gray-100"
                    value={parsedUser.program_code}
                    disabled
                  />
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />
          </div>

          {/* program_name */}
          <div className="w-3/4">
            <FormField
              control={form.control}
              name="program_name"
              render={() => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <Input
                    className="bg-gray-100"
                    value={parsedUser.program_name}
                    disabled
                  />
                  {/* <FormMessage /> */}
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
                    className="bg-gray-100"
                    value={parsedUser.faculty_name}
                    disabled
                  />
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
                    className="bg-gray-100"
                    value={parsedUser.current_semester}
                    disabled
                  />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* deferment_reason */}
        <FormField
          control={form.control}
          name="deferment_reason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
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
        )}

        {/* main_supervisor */}
        <FormField
          control={form.control}
          name="main_supervisor"
          render={() => (
            <FormItem>
              <FormLabel>Main Supervisor</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100"
                  value={parsedUser.supervisor}
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
                  {/* need to check */}
                  <Input
                    className="bg-gray-100"
                    value={parsedUser.co_supervisor}
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
                  className="bg-gray-100"
                  value={parsedUser.nationality}
                  disabled
                />
              </FormControl>
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
                  className="bg-gray-100"
                  value={parsedUser.proposal_defence_status}
                  disabled
                />
              </FormControl>
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
                  className="bg-gray-100"
                  value={parsedUser.nht_completion_status}
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-4 py-2">
          {parsedUser.nationality === "MY" ? (
            <Button variant="secondary">
              <Link
                to={local_deferment_pdf}
                download="UTMAMD01-Penangguhan-Pengajian-Pelajar-Tempatan-Pindaan-2022.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download Deferment Application Form (Local)
              </Link>
            </Button>
          ) : (
            <Button variant="secondary">
              <Link
                to={intl_deferment_pdf}
                download="UTMAMD02-Deferment-of-Study-International-Student-Amendment-2022.pdf"
                target="_blank"
                rel="noreferrer"
              >
                Download Deferment Application Form (International)
              </Link>
            </Button>
          )}
        </div>

        <div className="my-4 py-2">
          <FormLabel>Upload Deferment Application Form</FormLabel>
          <Input id="pdf_file" type="file" onChange={handleFileUpload} />
        </div>
        <div className="flex w-full justify-around">
          <Button className="text-right w-full mx-1" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default SubmitApplicationForm;
