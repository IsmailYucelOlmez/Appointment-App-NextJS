"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TimeInput from "@/components/TimeInput";
import AppointmentDataTable, { Appointment } from "@/components/AppointmentDataTable";


const formSchema = z.object({
  
  time: z.date({
    required_error: "A date and time is required.",
  }),
  patient: z.string({
    required_error: "Name is required",
  }).min(2, "Name must be at least 2 characters"),
  name: z.string({
    required_error: "Name is required",
  }).min(2, "Name must be at least 2 characters"),
  status: z.string({
    required_error: "Name is required",
  })
});


export default function Home() {

  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patient: "",
      name:"",
      time: new Date(),
      status:"pending",

    },
  });

  
  
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newAppointment: Appointment = {
      ...values,
      id: crypto.randomUUID(),
      status: values.status as 'pending' | 'confirmed' | 'cancelled'
    };
    setAppointments([...appointments, newAppointment]);
    form.reset();
  };
  

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      <AppointmentDataTable appointments={appointments} setAppointments={setAppointments} />

      <Card>
          <CardHeader>
        <CardTitle>Add Appointment</CardTitle>
          </CardHeader>
          <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            <TimeInput form={form} />

            <FormField
              control={form.control}
              name="patient"
              render={({ field }) => (
            <FormItem>
              <FormLabel>Patient</FormLabel>
              <FormControl>
            <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
            <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
            />

            <Button type="submit">Add Appointment</Button>
          </form>
        </Form>
          </CardContent>
        </Card>
      </div>
        </main>
  );
}
