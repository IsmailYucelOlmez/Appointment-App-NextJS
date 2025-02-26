"use client"
import React from 'react'
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import DatePicker from './DateTimePicker';
import { createAppointment } from '@/actions/actions';

const formSchema = z.object({
  
  date: z.date({
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

export type AppointmentForm=z.infer<typeof formSchema>


const AppointmentForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          patient: "",
          name:"",
          date: new Date(),
          status:"pending",
    
        },
      }); 
      
      

    const onSubmit =async (values: z.infer<typeof formSchema>) => {
        
        const result=await createAppointment(values);
        console.log(result);
        
        if (result?.success) {
          console.log('aapointment success');
          form.reset();
        } else {
          alert(result?.error.message);
        }
        
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
