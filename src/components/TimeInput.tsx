"use client";
import { CalendarIcon } from 'lucide-react';
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { UseFormReturn } from "react-hook-form";


const TimeInput = ({ form }: { form: UseFormReturn<any> }) => {
 
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("time", date);
    }
  }
 
  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("time") || new Date();
    let newDate = new Date(currentDate);
 
    if (type === "hour") {
      const hour = parseInt(value, 10);
      newDate.setHours(hour);
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10));
    }
 
    form.setValue("time", newDate);
  }
 
return (
    <FormField
        control={form.control} name="time"
        rules={{  required: "Please select a date and time",
                validate: (value) => {
                    if (!value) return "Please select a date and time";
                        const day = value.getDay();
                        const hour = value.getHours();
                        const minute = value.getMinutes();

                        if (day !== 2) return "Only Tuesdays are available";
                        if (hour < 9 || hour >= 14) return "Only hours between 09:00-14:00 are available";
                        if (hour === 13 && minute > 0) return "Last appointment must be at 13:00";
                                    
                        return true;
                    }
                }}
                render={({ field }) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>Enter your date & time (24h)</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button variant={"outline"} className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground" )} >
                                            {field.value ? (
                                                format(field.value, "MM/dd/yyyy HH:mm")
                                            ) : (
                                                <span>MM/DD/YYYY HH:mm</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <div className="sm:flex">
                                        
                                        <Calendar mode="single" selected={field.value} onSelect={handleDateSelect} initialFocus disabled={(date) => date.getDay() !== 2}  />
                                            
                                            <div className="flex flex-col sm:flex-row sm:h-[300px] divide-y sm:divide-y-0 sm:divide-x">
                                                <ScrollArea className="w-64 sm:w-auto">
                                                    <div className="flex sm:flex-col p-2">
                                                        {Array.from({ length: 6 }, (_, i) => i + 9).map((hour) => (
                                                            <Button
                                                                key={hour}
                                                                size="icon"
                                                                variant={
                                                                    field.value && field.value.getHours() === hour ? "default" : "ghost"
                                                                }
                                                                disabled={hour < 9 || hour >= 14}
                                                                className="sm:w-full shrink-0 aspect-square"
                                                                onClick={() => handleTimeChange("hour", hour.toString())}
                                                            >
                                                                {hour}
                                                            </Button>
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                                </ScrollArea>
                                                                    
                                                <ScrollArea className="w-64 sm:w-auto">
                                                    <div className="flex sm:flex-col p-2">
                                                        {Array.from({ length: 12 }, (_, i) => i * 5).map( (minute) => (
                                                            <Button key={minute} size="icon" variant={ field.value && field.value.getMinutes() === minute ? "default" : "ghost" }
                                                                    disabled={field.value?.getHours() === 13 && minute > 0}
                                                                    className="sm:w-full shrink-0 aspect-square"
                                                                    onClick={() => handleTimeChange("minute", minute.toString()) } >
                                                                        
                                                                        {minute.toString().padStart(2, "0")}
                                                                </Button>
                                                        ))}
                                                    </div>
                                                    <ScrollBar orientation="horizontal" className="sm:hidden" />
                                                </ScrollArea>
                                            </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        <FormDescription>
                            Please select your preferred date and time (Available: Tuesdays, 09:00-13:00).
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
    )} />
);
}

export default TimeInput