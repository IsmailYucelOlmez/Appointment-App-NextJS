"use client"
import React from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Appointment } from './AppointmentDataTable';
import { updateAppointment } from '@/actions/actions';

type AppointmentStatuProps = {
    apt: Appointment & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    },
    //handleStatusChange: (id: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => void;
}

const appointmentStatu = ({apt}:AppointmentStatuProps) => {

    const handleStatusChange =async (id:string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
        
        const result=await updateAppointment(newStatus,id)

        if(result.success){
            alert('Appointment Updated')
        }else{
            alert('Error')
        }

        console.log(result);

    };
    

  return (
    <Select value={apt.status} onValueChange={async(value) =>{
                                                await handleStatusChange(apt.id, value as 'pending' | 'confirmed' | 'cancelled');
                                                alert('Appointment Updated') }} >
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Durum seç" />
        </SelectTrigger>

        <SelectContent>
            <SelectItem value="pending">Beklemede</SelectItem>
            <SelectItem value="confirmed">Onaylandı</SelectItem>
            <SelectItem value="cancelled">İptal Edildi</SelectItem>
        </SelectContent>
    </Select>
  )
}

export default appointmentStatu
