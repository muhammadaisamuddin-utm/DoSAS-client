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
import { useState } from "react";
import {
  PopoverContent,
  Popover,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
// import { CommandEmpty, CommandInput } from "cmdk";

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

function ApplicationForm() {
  // define form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaulvalues for form fields
    defaultValues: {},
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <div className="font-bold p-4 text-center">
        Student Deferment Application
        {/* Student Deferment Application */}
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
                  <Input
                    className="bg-gray-100"
                    placeholder="ALI BIN ABU"
                    {...field}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">IC/ISID</FormLabel>
                <FormControl>
                  {/* <Input placeholder="NRIC" {...field} /> */}
                  <Input
                    className="bg-gray-100"
                    placeholder="921212-10-5431"
                    {...field}
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
            render={({ field }) => (
              <FormItem>
                <FormLabel className="">Student ID</FormLabel>
                <FormControl>
                  <Input
                    className="bg-gray-100"
                    placeholder="MAN221001"
                    {...field}
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
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Program Code</FormLabel>
                  <Input
                    className="bg-gray-100"
                    placeholder="MANPA1CKA"
                    {...field}
                  />
                  {/* <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button> */}
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
                  <Input
                    className="bg-gray-100"
                    placeholder="MASTER OF SOFTWARE ENGINEERING"
                    {...field}
                  />
                  {/* <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button> */}
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
                  <Input
                    className="bg-gray-100"
                    placeholder="RAZAK FACULTY OF TECHNOLOGY AND INFORMATICS
"
                    {...field}
                  />
                  {/* <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button> */}
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
                  <Input
                    className="bg-gray-100"
                    placeholder="2022/2023 - 1"
                    {...field}
                  />

                  {/* <Button
                    variant="outline"
                    role="combobox"
                    className="w-full justify-end"
                  >
                    <ChevronsUpDown className="  shrink-0 " />
                  </Button> */}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
              <FormControl>
                {/* <Input placeholder="Proposal Defense" {...field} /> */}
                {/* <Input placeholder="" {...field} /> */}

                <Input
                  className="bg-gray-100"
                  placeholder="PERSONAL HEALTH ISSUES"
                  {...field}
                />
                {/* <br /> */}
              </FormControl>

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
                {/* <Input placeholder="" {...field} /> */}
                <Input
                  className="bg-gray-100"
                  placeholder="DR SHAZAM BIN SHAZZA"
                  {...field}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Co-Supervisor</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  {/* <Input placeholder="" {...field} /> */}

                  <Input
                    className="bg-gray-100"
                    placeholder="DR MIRA BINTI MARI"
                    {...field}
                  />
                  {/* <Button variant="outline" className="">
                    <Plus className="  shrink-0 " />
                  </Button> */}
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
                <Input
                  className="bg-gray-100"
                  disabled
                  type=""
                  placeholder="MALAYSIAN"
                  {...field}
                />
                {/* <br /> */}
              </FormControl>

              {/* <Button
                variant="outline"
                role="combobox"
                className="w-full justify-end"
              >
                <ChevronsUpDown className="  shrink-0 " />
              </Button> */}
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

                <Input className="bg-gray-100" placeholder="" {...field} />
                {/* <br /> */}
              </FormControl>

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
                <Input
                  className="bg-gray-100"
                  placeholder="INCOMPLETE"
                  {...field}
                />
              </FormControl>
              {/* <br /> */}

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

        {/* <div className="my-4 py-2">
          <Button variant="secondary">
            Download Deferment Application Form
          </Button>
        </div> */}

        {/* <div className="my-4 py-2">
          <FormLabel>Upload Deferment Application Form</FormLabel>
          <Input type="file" />
        </div> */}
        <br />

        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rejection Reasons</FormLabel>
              <FormControl>
                {/* <Input type="" placeholder="Nationality" {...field} /> */}
                {/* <Input
                  className="bg-gray-100"
                  disabled
                  type=""
                  placeholder="MALAYSIAN"
                  {...field}
                /> */}
                {/* <br /> */}

                {/* nationality */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      className="w-full justify-end"
                    >
                      {value
                        ? reasons.find((reason) => reason.value === value)
                            ?.label
                        : ""}
                      <ChevronsUpDown className="  shrink-0 " />
                      {/* <span className="w-full text-left"></span> */}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search reason for rejection..." />
                      <CommandEmpty>No reasons found.</CommandEmpty>
                      <CommandGroup>
                        {reasons.map((reason) => (
                          <CommandItem
                            key={reason.value}
                            value={reason.value}
                            onSelect={(curr) => {
                              setValue(curr === value ? "" : curr);
                              setOpen(false);
                            }}
                          >
                            {reason.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>

              {/* <Button
                variant="outline"
                role="combobox"
                className="w-full justify-end"
              >
                <span className="w-full text-left"></span>
                <ChevronsUpDown className="  shrink-0 " />
              </Button> */}
              <FormMessage />
            </FormItem>
          )}
        />

        <br />
        <div className="flex w-full justify-around">
          <Button
            variant="destructive"
            // className="text-right w-full mx-1"
            className="text-right bg-gray-500 w-full mx-1"
            type="submit"
          >
            {/* Update Application */}
            Reject
          </Button>
          <Button
            variant="default"
            className="text-right bg-green-700 w-full mx-1"
            // className="text-right bg-gray-500 w-full mx-1"
            type="submit"
          >
            {/* Update Application */}
            Approve
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default ApplicationForm;
