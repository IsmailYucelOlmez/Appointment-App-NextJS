"use server"
import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { tr } from 'date-fns/locale';
import { prisma } from '@/lib/db';
import AppointmentStatu from './appointmentStatu';
//import { updateAppointment } from '@/actions/actions';

export interface Appointment {
    date: Date;
    patient: string;
    //name:string;
    status: string;
}

const AppointmentDataTable = async () => {

    const appointments = await prisma.appointment.findMany()

    

  return (
    <Card>
        <CardHeader>
            <CardTitle>Randevular</CardTitle>
        </CardHeader>

        <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Tarih ve Saat</TableHead>                                
                            <TableHead>Hasta</TableHead>
                            <TableHead>Randevu Alan Kişi</TableHead>
                            <TableHead>Durum</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {appointments.map((apt) => (
                            <TableRow key={apt.id}>
                                <TableCell>{format(new Date(apt.date), 'dd LLLL yyyy HH:mm', { locale: tr })}</TableCell>
                                <TableCell>{apt.patient}</TableCell>
                                {/* <TableCell>{apt.name}</TableCell> */}
                                <TableCell>{apt.status}</TableCell>
                                <TableCell>
                                    <AppointmentStatu apt={apt} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
        </CardContent>
             
    </Card>
  )
}

export default AppointmentDataTable
