import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { prisma } from '@/lib/db'

interface Appointment {
    id: string
    date: Date
    service: string
    status: 'pending' | 'confirmed' | 'cancelled'
    provider: {
        name: string
        image?: string
    }
}

const UserProfile= async({params})=> {

    const userAppointments=await prisma.appointment.findUnique(
        {where:{slug:params.slug},
        
        //include:{user:true} for example get user with his appointments (for getUserById with user's appointments)
        },
        
    )

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'bg-green-500'
            case 'pending':
                return 'bg-yellow-500'
            case 'cancelled':
                return 'bg-red-500'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <div className="container mx-auto p-6">
            <Card className="mb-6">
                <CardContent className="pt-6">
                    <div className="flex items-center">                    
                        <h2 className="text-2xl font-bold">{user.name}</h2>
                        <p className="text-gray-500">{user.email}</p>                    
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Randevularım</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Tarih</TableHead>
                                <TableHead>Hizmet</TableHead>
                                <TableHead>Sağlayıcı</TableHead>
                                <TableHead>Durum</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userAppointments.map((appointment) => (
                                <TableRow key={appointment.id}>
                                    <TableCell>
                                        {format(new Date(appointment.date), 'dd/MM/yyyy HH:mm')}
                                    </TableCell>
                                    <TableCell>{appointment.service}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center space-x-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={appointment.provider.image} />
                                                <AvatarFallback>{appointment.provider.name[0]}</AvatarFallback>
                                            </Avatar>
                                            <span>{appointment.provider.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={getStatusColor(appointment.status)}>
                                            {appointment.status}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default UserProfile