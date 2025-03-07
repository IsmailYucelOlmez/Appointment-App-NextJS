'use client';
import { useState } from 'react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import AppointmentDataTable from '@/components/AppointmentDataTable';

interface BlockedDate {
    date: string;
    reason: string;
}

const AdminPanel=()=> {

    const [blockedDates, setBlockedDates] = useState<BlockedDate[]>([]);
    const [newBlockedDate, setNewBlockedDate] = useState({ date: '', reason: '' });


    const handleBlockDate = () => {
        if (newBlockedDate.date && newBlockedDate.reason) {
            setBlockedDates([...blockedDates, newBlockedDate]);
            setNewBlockedDate({ date: '', reason: '' });
            // Add API call to save blocked date
        }
    };

    const handleUnblockDate = (dateToUnblock: string) => {
        setBlockedDates(blockedDates.filter(bd => bd.date !== dateToUnblock));
        // Add API call to remove blocked date
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

            <div className="space-y-8">

                <AppointmentDataTable />

                <Card>
                    <CardHeader>
                        <CardTitle>Kapalı Tarihler</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 mb-6">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-[240px] justify-start text-left font-normal",
                                            !newBlockedDate.date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {newBlockedDate.date ? format(new Date(newBlockedDate.date), 'PPP', { locale: tr }) : <span>Tarih seçin</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="single"
                                        selected={newBlockedDate.date ? new Date(newBlockedDate.date) : undefined}
                                        onSelect={(date) => setNewBlockedDate({ ...newBlockedDate, date: date ? format(date, 'yyyy-MM-dd') : '' })}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            <Input
                                type="text"
                                value={newBlockedDate.reason}
                                onChange={(e) => setNewBlockedDate({ ...newBlockedDate, reason: e.target.value })}
                                placeholder="Kapanış nedeni"
                            />
                            <Button onClick={handleBlockDate}>
                                Tarihi Kapat
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {blockedDates.map((bd) => (
                                <Card key={bd.date}>
                                    <CardContent className="pt-6 flex justify-between items-center">
                                        <div>
                                            <div className="font-medium">{format(new Date(bd.date), 'd MMMM yyyy', { locale: tr })}</div>
                                            <div className="text-muted-foreground">{bd.reason}</div>
                                        </div>
                                        <Button
                                            variant="destructive"
                                            onClick={() => handleUnblockDate(bd.date)}
                                        >
                                            Kaldır
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

export default AdminPanel;