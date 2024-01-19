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
import { Check, ChevronsUpDown } from "lucide-react";
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
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

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
    value: "",
    label: "None",
  },
  {
    value: "some information in deferment application form is not available",
    label: "Some information in deferment application form is not available",
  },
  { value: "missing medical report", label: "Missing medical report" },
  { value: "missing offical letter", label: "Missing official letter" },
  { value: "missing signatures", label: "Missing signatures" },
  { value: "others", label: "Others" },
];

function ViewApplicationByOfficeAssistant() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
        Student Deferment Application View
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
            render={() => (
              <FormItem>
                <FormLabel className="">Name</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    placeholder="ALI BIN ABU"
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
                    placeholder="921212-10-5431"
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
                    placeholder="MAN221001"
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
                    placeholder="MANPA1CKA"
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
                    placeholder="MASTER OF SOFTWARE ENGINEERING"
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
                    placeholder="RAZAK FACULTY OF TECHNOLOGY AND INFORMATICS"
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
                    placeholder="2022/2023 - 1"
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
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  placeholder="PERSONAL HEALTH ISSUES"
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
                  placeholder="DR SHAZAM BIN SHAZZA"
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
                    placeholder="DR MIRA BINTI MARI"
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
                  placeholder="MALAYSIAN"
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
                  placeholder=""
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
                  placeholder="INCOMPLETE"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={() => (
            <FormItem>
              <FormLabel>Rejection Reasons</FormLabel>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      <span className="">
                        {value
                          ? reasons.find((reason) => reason.value === value)
                              ?.label
                          : ""}
                      </span>
                      <ChevronsUpDown className="  shrink-0 " />
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
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue
                              );
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                value === reason.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {reason.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {value === "others" && (
          <FormField
            control={form.control}
            name="name"
            render={() => (
              <FormItem>
                <FormControl>
                  <Textarea placeholder="Enter your rejection reason here." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {value === "" ? (
          <div className="flex w-full justify-around">
            <Button
              disabled
              variant="destructive"
              className="text-right bg-gray-500 w-full mx-1"
              type="submit"
            >
              Reject
            </Button>
            <Button
              variant="default"
              className="text-right bg-green-700 w-full mx-1"
              type="submit"
            >
              Approve
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
              type="submit"
            >
              Approve
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}

export default ViewApplicationByOfficeAssistant;