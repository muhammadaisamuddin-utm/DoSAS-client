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
import { ChevronsUpDown, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axiosInstance";

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
//     value: "Some information in deferment application form is not available",
//     label: "Some information in deferment application form is not available",
//   },
//   { value: "Missing medical report", label: "Missing medical report" },
//   { value: "Missing offical letter", label: "Missing official letter" },
//   { value: "Missing signatures", label: "Missing signatures" },
//   { value: "Others", label: "Others" },
// ];

// function onSubmit(values: z.infer<typeof formSchema>) {
//   console.log(values);
// }

function UpdateApplicationForm() {
  const [application, setApplication] = useState<any>();

  let { id } = useParams();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaulvalues for form fields
    defaultValues: {},
  });

  const getApplication = async () => {
    try {
      const response: any = await axiosInstance.get(
        "/api/deferment-applications"
      );

      if (id) setApplication(response.deferment_applications[id]);
    } catch (e) {
      console.error(e);
    }
  };

  // const [open, setOpen] = useState(false);
  // const [value, setValue] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const navigate = useNavigate();

  useEffect(() => {
    getApplication();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="flex relative items-center">
          <Button className="z-40 w-20 h-8" onClick={() => navigate("/home")}>
            Back
          </Button>
          <span className="absolute mx-auto w-full text-center font-bold">
            Update Student Deferment Application
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
                    value={application.name}
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
            name="student_id"
            render={() => (
              <FormItem>
                <FormLabel className="">Student ID</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    value={application.identity_no}
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
              render={() => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Input
                    className="bg-gray-100"
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
              render={() => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <Input
                    className="bg-gray-100"
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
                    className="bg-gray-100"
                    value={application.program_name}
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
                    className="bg-gray-100"
                    value={application.current_semester}
                    disabled
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* proposal_defense */}
        <FormField
          control={form.control}
          name="proposal_defense"
          render={() => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
              <FormControl>
                {/* <Input
                  className="bg-gray-100"
                  {...field}
                /> */}
              </FormControl>
              <Button
                variant="outline"
                role="combobox"
                // aria-expanded={open}
                className="w-full justify-end"
              >
                <ChevronsUpDown className="  shrink-0 " />
              </Button>
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
                  className=""
                  value={application.main_supervisor}
                  // {...field}
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
                  <Input className="" value={application.co_supervisor} />
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
                  className=""
                  placeholder=""
                  value={application.proposal_defense}
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
                <Input className="" value={application.nht_completion_status} />
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

        <FormField
          control={form.control}
          name="nationality"
          render={() => (
            <FormItem>
              <FormLabel>Rejection Reasons</FormLabel>
              <FormControl>
                <Input
                  className="bg-gray-100"
                  placeholder="Not enough information"
                  disabled
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <br />

        <div className="flex w-full justify-around">
          <Button className="text-right w-full mx-1" type="submit">
            Update Application
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default UpdateApplicationForm;
