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
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/authContext";

const formSchema = z.object({
  name: z.string(),
  nric: z.string(),
  student_id: z.string(),
  program_code: z.string(),
  faculty: z.string(),
  program_name: z.string(),
  current_semester: z.string(),
  main_supervisor: z.string(),
  co_supervisor: z.string(),
  nationality: z.string(),
  proposal_defense: z.string(),
  nht_completion_status: z.string(),
  deferment_history: z.string(),
});

// const reasons = [
//   {
//     value: "",
//     label: "None",
//   },
//   {
//     value: "some information in deferment application form is not available",
//     label: "Some information in deferment application form is not available",
//   },
//   { value: "missing medical report", label: "Missing medical report" },
//   { value: "missing offical letter", label: "Missing official letter" },
//   { value: "missing signatures", label: "Missing signatures" },
//   { value: "others", label: "Others" },
// ];

function ViewApplicationByStudent() {
  const { user } = useAuth();

  let parsedUser: any;
  if (user != null || user != undefined) parsedUser = JSON.parse(user);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const navigate = useNavigate();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="flex relative items-center">
          <Button className="z-40 w-20 h-8" onClick={() => navigate(-1)}>
            Back
          </Button>
          <span className="absolute mx-auto w-full text-center font-bold">
            Student Deferment Application View
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.name}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.identity_no}
                  />
                </FormControl>
                <FormMessage />
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.identity_no}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="w-full flex space-x-2 justify-between">
          {/* name */}
          {/* program_code */}
          <div className="w-1/4">
            <FormField
              control={form.control}
              name="program_code"
              render={() => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.program_code}
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
              render={() => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.program_name}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.program_name}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.current_semester}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* deferment_reason */}
        <FormField
          control={form.control}
          name="proposal_defense"
          render={() => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  value={parsedUser.deferment_reason}
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
                  disabled
                  className="bg-gray-100 font-bold"
                  value={parsedUser.main_supervisor}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={parsedUser.co_supervisor}
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
                  disabled
                  className="bg-gray-100 font-bold"
                  value={parsedUser.nationality}
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
                  disabled
                  className="bg-gray-100 font-bold"
                  value={parsedUser.proposal_defense}
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
                  disabled
                  className="bg-gray-100 font-bold"
                  value={parsedUser.nht_completion_status}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="text-right w-full mx-1"
          onClick={() => navigate("/")}
        >
          Go Back
        </Button>
      </form>
    </Form>
  );
}

export default ViewApplicationByStudent;
