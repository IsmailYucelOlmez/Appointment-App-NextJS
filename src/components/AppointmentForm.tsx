import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
//import TimeInput from "@/components/TimeInput";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Appointment } from './AppointmentDataTable';
import DatePicker from './DateTimePicker';

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


const AppointmentForm = ({appointments,setAppointments}: {appointments: Appointment[], setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>}) => {

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
    <Card>
          <CardHeader>
        <CardTitle>Add Appointment</CardTitle>
          </CardHeader>
          <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    
            <DatePicker form={form}/> 
                              
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
  )
}

export default AppointmentForm
