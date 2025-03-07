"use server"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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


type ProfileParams = {
    params: {
        slug: string
    }
}

const UserProfile = async ({ params }: ProfileParams) => {

    const user = {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
    };

    const appointments = [
        {
            id: '1',
            date: new Date(),
            service: 'Saç Kesimi',
            status: 'confirmed',
            provider: {
                name: 'Ahmet Kuaför',
            }
        },
        {
            id: '2',
            date: new Date(Date.now() + 86400000), // tomorrow
            service: 'Sakal Tıraşı',
            status: 'pending',
            provider: {
                name: 'Mehmet Berber',
            }
        },
        {
            id: '3',
            date: new Date(Date.now() - 86400000), // yesterday
            service: 'Cilt Bakımı',
            status: 'cancelled',
            provider: {
                name: 'Ayşe Güzellik Salonu',
            }
        }
    ];

    // Replace prisma query with dummy data
    const userAppointments = appointments;
    //const userAppointmentss=await prisma.appointment.findMany(
        //{where:{userId:params.slug},
        
        //include:{user:true} for example get user with his appointments (for getUserById with user's appointments)
        //}, 
    //)

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