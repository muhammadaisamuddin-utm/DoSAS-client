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
import { Label } from "@radix-ui/react-label";
import { ChevronsUpDown, Plus } from "lucide-react";

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

function ApplicationForm() {
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaulvalues for form fields
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="font-bold p-4 text-center">
        Student Deferment Application
      </div>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 flex flex-col flex-wrap w-full max-w-lg justify-center mx-auto mt-2 mb-4"
      >
        <div className="w-full flex space-x-4 justify-between">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Name" {...field} /> */}
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* nric */}
          <FormField
            control={form.control}
            name="nric"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">NRIC</FormLabel>
                <FormControl>
                  {/* <Input placeholder="NRIC" {...field} /> */}
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* matric card */}
          <FormField
            control={form.control}
            name="student_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Student ID</FormLabel>
                <FormControl>
                  {/* <Input placeholder="NRIC" {...field} /> */}
                  <Input placeholder="" {...field} />
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Name</FormLabel>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button>
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Semester</FormLabel>
                  <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* main_supervisor */}
        <FormField
          control={form.control}
          name="main_supervisor"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Main Supervisor</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
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
                  <Input placeholder="" {...field} />
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                {/* <Input type="" placeholder="Nationality" {...field} /> */}
                {/* <Input type="" placeholder="" {...field} /> */}
                <br />
              </FormControl>

              <Button
                variant="outline"
                role="combobox"
                className="w-full justify-end"
              >
                <ChevronsUpDown className="  shrink-0 " />
              </Button>
              <FormMessage />
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
                {/* <Input placeholder="Proposal Defense" {...field} /> */}
                {/* <Input placeholder="" {...field} /> */}
                <br />
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

        {/* nht_completion_status */}
        <FormField
          control={form.control}
          name="nht_completion_status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NHT Completion Status</FormLabel>
              <FormControl>
                {/* <Input placeholder="NHT Completion Status" {...field} /> */}
                {/* <Input placeholder="" {...field} /> */}
              </FormControl>
              <br />

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

        <div className="my-4 py-2">
          <Button variant="secondary">
            Download Deferment Application Form
          </Button>
        </div>

        <div className="my-4 py-2">
          {/* <Label>Upload File</Label> */}
          <FormLabel>Upload Deferment Application Form</FormLabel>
          <Input type="file" />
        </div>

        <Button className="text-right" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default ApplicationForm;
