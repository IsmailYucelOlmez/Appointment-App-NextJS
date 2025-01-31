import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { tr } from 'date-fns/locale';

export interface Appointment {
  id: string;
  time: Date;
  patient: string;
  name:string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

const AppointmentDataTable = ({appointments,setAppointments}: {appointments: Appointment[], setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>}) => {

    const handleStatusChange = (appointmentId: string, newStatus: 'pending' | 'confirmed' | 'cancelled') => {
        setAppointments(appointments.map(apt =>
            apt.id === appointmentId ? { ...apt, status: newStatus } : apt
        ));
        // Add API call to update status
    };

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
                                <TableCell>{format(new Date(apt.time), 'dd MM yyyy eeee HH:mm', { locale: tr })}</TableCell>
                                <TableCell>{apt.patient}</TableCell>
                                <TableCell>{apt.name}</TableCell>
                                <TableCell>{apt.status}</TableCell>
                                <TableCell>
                                <Select value={apt.status} onValueChange={(value) => handleStatusChange(apt.id, value as 'pending' | 'confirmed' | 'cancelled')} >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Durum seç" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="pending">Beklemede</SelectItem>
                                        <SelectItem value="confirmed">Onaylandı</SelectItem>
                                        <SelectItem value="cancelled">İptal Edildi</SelectItem>
                                    </SelectContent>
                                </Select>
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
