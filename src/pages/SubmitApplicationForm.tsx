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
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
// import { CommandEmpty, CommandInput } from "cmdk";

const formSchema = z.object({
  name: z.string(),
  nric: z.string(),
  student_id: z.string(),
  program_code: z.string(),
  faculty: z.string(),
  program_name: z.string(),
  current_semester: z.number(),
  deferment_reason: z.string(),
  main_supervisor: z.string(),
  co_supervisor: z.string(),
  nationality: z.string(),
  proposal_defense: z.string(),
  nht_completion_status: z.string(),
  // deferment_history: z.string(),
});

const reasons = [
  {
    value: "Some information in deferment application form is not available",
    label: "Some information in deferment application form is not available",
  },
  { value: "Missing medical report", label: "Missing medical report" },
  { value: "Missing offical letter", label: "Missing official letter" },
  { value: "Missing signatures", label: "Missing signatures" },
  { value: "Others", label: "Others" },
];

function SubmitApplicationForm() {
  const { user } = useAuth();

  let parsedUser:any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaulvalues for form fields
    defaultValues: {
      name: parsedUser.name,
      nric: parsedUser.identity_no,
      student_id: parsedUser.userid,
      program_code: parsedUser.program_code,
      program_name: parsedUser.program_name,
      faculty: parsedUser.faculty_name,
      current_semester: parsedUser.current_semester,
      nationality: parsedUser.nationality,
    },
  });

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await axios.post(
        "https://api.dosas.online/api/deferment-application",
        values
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="flex relative items-center">
          <Button className="z-40 w-20 h-8" onClick={() => navigate("/")}>
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

          {/* nric */}
          <FormField
            control={form.control}
            name="nric"
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
            name="student_id"
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
                  {/* <FormMessage /> */}
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
                    // placeholder="2022/2023 - 1"
                    disabled
                  />
                  {/* <FormMessage /> */}
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
              <Select onValueChange={field.onChange} defaultValue="field.value">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a deferment reason" />
                  </SelectTrigger>
                  {/* <Input
                  className="bg-gray-100"
                  {...field}
                /> */}
                </FormControl>
                <SelectContent>
                  {reasons.map((reason, index) => {
                    return (
                      <SelectItem key={index} value={reason.value}>
                        {reason.label}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {/* <Button
                variant="outline"
                role="combobox"
                // aria-expanded={open}
                className="w-full justify-end"
              >
                <ChevronsUpDown className="  shrink-0 " />
              </Button> */}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* main_supervisor */}
        <FormField
          control={form.control}
          name="main_supervisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Supervisor</FormLabel>
              <FormControl>
                <Input className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* co_supervisor */}
        <FormField
          control={form.control}
          name="co_supervisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Co-Supervisor</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input className="" {...field} />
                  <Button variant="outline" className="">
                    <Plus className="  shrink-0 " />
                  </Button>
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
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />

        {/* proposal_defense */}
        <FormField
          control={form.control}
          name="proposal_defense"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proposal Defense</FormLabel>
              <FormControl>
                <Input className="" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* nht_completion_status */}
        <FormField
          control={form.control}
          name="nht_completion_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NHT Completion Status</FormLabel>
              <FormControl>
                <Input className="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="my-4 py-2">
          <Button variant="secondary">
            Download Deferment Application Form
          </Button>
        </div>

        <div className="my-4 py-2">
          <FormLabel>Upload Deferment Application Form</FormLabel>
          <Input type="file" />
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
