"use client"
import { deleteAppointment } from '@/actions/actions'
import { Trash } from 'lucide-react'
import React from 'react'

export type AppointmentDeleteProps={
    id:string
}

const AppointmentDelete = ({id}:AppointmentDeleteProps) => {

    const handleDelete=async(id:string)=>{
        const result=await deleteAppointment(id)

        if(result.success){
            alert('Appointment Deleted')
        }else{
            alert('Error')
        }
    }

  return (
    <button onClick={async()=>{await handleDelete(id) } }>
        <Trash size={20}  className='cursor-pointer'/>
    </button>
  )
}

export default AppointmentDelete
