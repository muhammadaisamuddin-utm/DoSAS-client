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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const formSchema = z.object({
  name: z.string().min(0),
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

function ViewApplicationBySigner() {
  let { id } = useParams();

  const [application, setApplication] = useState<any>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const navigate = useNavigate();

  const getApplication = async () => {
    try {
      const response: any = await axios.get(
        "https://api.dosas.online/api/deferment-applications",
        {
          withCredentials: true,
        }
      );

      if (id) setApplication(response.deferment_applications[id]);
    } catch (e) {
      console.error(e);
    }
  };

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
            Student Deferment Application View
          </span>
        </div>
        <div className="w-full flex space-x-4 justify-between">
          {/* name */}
          <FormField
            control={form.control}
            name="name"
            defaultValue="" //
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

          {/* nric */}
          <FormField
            control={form.control}
            name="nric"
            defaultValue="" //
            render={() => (
              <FormItem>
                <FormLabel className="">IC/ISID</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.identity_no}
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
            defaultValue="" //
            render={() => (
              <FormItem>
                <FormLabel className="">Student ID</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.identity_no}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.program_code}
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
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.program_name}
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
              defaultValue="" //
              render={() => (
                <FormItem>
                  <FormLabel>Faculty</FormLabel>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.faculty}
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
              defaultValue="" //
              render={() => (
                <FormItem>
                  <FormLabel>Current Semester</FormLabel>
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.current_semester}
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
          name="proposal_defense"
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>Deferment Reason</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  value={application.deferment_reason}
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
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>Main Supervisor</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  value={application.main_supervisor}
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
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>Co-Supervisor</FormLabel>
              <FormControl>
                <div className="flex space-x-2">
                  <Input
                    disabled
                    className="bg-gray-100 font-bold"
                    value={application.co_supervisor}
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
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>Nationality</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  value={application.nationality}
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
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>Proposal Defense</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
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
          defaultValue="" //
          render={() => (
            <FormItem>
              <FormLabel>NHT Completion Status</FormLabel>
              <FormControl>
                <Input
                  disabled
                  className="bg-gray-100 font-bold"
                  value={application.nht_completion_status}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

export default ViewApplicationBySigner;
