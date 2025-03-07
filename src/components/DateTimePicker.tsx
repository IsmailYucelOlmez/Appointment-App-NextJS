"use client"

import { format } from "date-fns"
import * as React from "react"
import { UseFormReturn } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { CalendarIcon } from "lucide-react"
import { tr } from "date-fns/locale"
import { AppointmentForm } from "./AppointmentForm"

export default function DatePicker({ form }: { form: UseFormReturn<AppointmentForm> }) {

    const [date, setDate] = React.useState<Date>()

    const changeHour = (hour: string) => {
        if (date) {
            const newDate = new Date(date);
            newDate.setHours(parseInt(hour, 0));
            
            setDate(newDate);
            form.setValue("date", newDate);
            console.log(date)
        }
    };

    const changeMinute = (minute: string) => {
        if (date) {
            const newDate = new Date(date);
            newDate.setMinutes(parseInt(minute, 0));
            setDate(newDate);
            form.setValue("date", newDate);
            console.log(date)
        }
    }    

    const handleDateSelect = (newDate: Date | undefined) => {
        setDate(newDate);
        if (newDate) {
            form.setValue("date", newDate);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-[240px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                    )}
                >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd MM yyyy HH:mm", { locale: tr }) : <span>Tarih seçin</span>}
                </Button>
                
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 flex divide-x-2" align="start">
                <Calendar 
                    mode="single" 
                    selected={date} 
                    onSelect={handleDateSelect} 
                    disabled={(date) => date.getDay() !== 2}
                    autoFocus 
                    weekStartsOn={1}
                    locale={tr}
                />
                <div className="flex flex-col gap-2 justify-center items-center">
                    <button onClick={()=>changeHour("9")} className={`rounded-xs py-1 px-2 ${date?.getHours() === 9 ? 'bg-black text-white' : ''}`}>9</button>
                    <button onClick={()=>changeHour("10")} className={`rounded-xs py-1 px-2 ${date?.getHours() === 10 ? 'bg-black text-white' : ''}`}>10</button>
                    <button onClick={()=>changeHour("11")} className={`rounded-xs py-1 px-2 ${date?.getHours() === 11 ? 'bg-black text-white' : ''}`}>11</button>
                    <button onClick={()=>changeHour("13")} className={`rounded-xs py-1 px-2 ${date?.getHours() === 13 ? 'bg-black text-white' : ''}`}>13</button>
                    <button onClick={()=>changeHour("14")} className={`rounded-xs py-1 px-2 ${date?.getHours() === 14 ? 'bg-black text-white' : ''}`}>14</button>
                </div>
                <div className="flex flex-col gap-2 justify-center items-center">
                    <button onClick={()=>changeMinute("0")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 0 ? 'bg-black text-white' : ''}`}>00</button>
                    <button onClick={()=>changeMinute("10")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 10 ? 'bg-black text-white' : ''}`}>10</button>
                    <button onClick={()=>changeMinute("20")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 20 ? 'bg-black text-white' : ''}`}>20</button>
                    <button onClick={()=>changeMinute("30")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 30 ? 'bg-black text-white' : ''}`}>30</button>
                    <button onClick={()=>changeMinute("40")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 40 ? 'bg-black text-white' : ''}`}>40</button>
                    <button onClick={()=>changeMinute("50")} className={`rounded-xs py-1 px-2 ${date?.getMinutes() === 50 ? 'bg-black text-white' : ''}`}>50</button>
                </div>
            </PopoverContent>
        </Popover>
    )
}