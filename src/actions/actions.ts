"use server";

import { AppointmentForm } from "@/components/AppointmentForm";
import { prisma } from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { schema } from "@/lib/schema";

export const signUp = async (formData: FormData) => {
    return executeAction({
      actionFn: async () => {
        const email = formData.get("email");
        const password = formData.get("password");
        const validatedData = schema.parse({ email, password });
        await prisma.user.create({
          data: {
            email: validatedData.email.toLocaleLowerCase(),
            password: validatedData.password,
          },
        });
      },
      successMessage: "Signed up successfully",
    });
};;


export const createAppointment=async(formData:AppointmentForm)=>{

    await prisma.appointment.create({
 
        data: {
            date: new Date(formData.date),
            patient: formData.patient,
            userId: formData.name,
            status: formData.status || "pending",
        },       
    })
}

export const updateAppointment=async(formData:AppointmentForm,id:string)=>{

    await prisma.appointment.update({
        where:{
            id:id,
        },
        data:{
            status:formData.status
        }
    })
}

export const deleteAppointment=async(id:string)=>{
    await prisma.appointment.delete({
        where:{
            id:id
        }
    })
}


//blocked date

export const addBlockedDate=async(date:Date)=>{
    await prisma.blockedDate.create({
        data:{
            date:date
        }
    })
}

export const removeBlockedDate=async(id:string)=>{
    await prisma.blockedDate.delete({
        where:{
            id:id
        }
    })
}

//pharmacy

export const createPharmacy=async(formData)=>{
    await prisma.pharmacy.create({
        data:{
            name:formData.name,
            address:formData.address,
            phone:formData.phone
        }
    })
}

export const updatePharmacy=async(formData,id:string)=>{
    await prisma.pharmacy.update({
        where:{
            id:id
        },
        data:{
            name:formData.name,
            address:formData.address,
            phone:formData.phone
        }
    })
}

export const deletePharmacy=async(id:string)=>{
    await prisma.pharmacy.delete({
        where:{
            id:id
        }
    })
}
