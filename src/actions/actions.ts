"use server";
import { AppointmentForm } from "@/components/AppointmentForm";
import { prisma } from "@/lib/db";
import { executeAction } from "@/lib/executeAction";
import { registerSchema } from "@/lib/schema";

export const signUp = async (formData: FormData) => {
    return executeAction({
      actionFn: async () => {
        console.log(formData)
        const name=formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const validatedData = registerSchema.parse({ name, email, password });
        await prisma.user.create({
          data: {
            name:validatedData.name,
            email: validatedData.email.toLocaleLowerCase(),
            password: validatedData.password,
          },
        });
      },
      successMessage: "Signed up successfully",
    });
};;


export const createAppointment=async(formData:AppointmentForm)=>{

    try{
        const result=await prisma.appointment.create({
 
            data: {
                date: new Date(formData.date),
                patient: formData.patient,
                userId: '605c72ef1532072fcf9c4d59',
                status: formData.status || "pending",
            },       
        })

        return {success:true,appointment:result}
    }catch(e){
        
        return {success:false,error:e}
    }
}

export const updateAppointment=async(status:string,id:string)=>{

    try{

        const result=await prisma.appointment.update({
            where:{
                id:id,
            },
            data:{
                status:status
            }
        })

        return {success:true,appointment:result}

    }catch(e){
        return {success:false,error:e}
    }
}

export const deleteAppointment=async(id:string)=>{

    try{
        const result=await prisma.appointment.delete({
            where:{
                id:id
            }
        })

        return {success:true,appointment:result}
    }catch(e){
        return {success:false,error:e}
    }
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
