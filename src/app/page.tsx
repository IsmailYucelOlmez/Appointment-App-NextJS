"use client";
import { useState } from "react";
import AppointmentDataTable, { Appointment } from "@/components/AppointmentDataTable";
import AppointmentForm from "@/components/AppointmentForm";


export default function Home() {

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <AppointmentDataTable appointments={appointments} setAppointments={setAppointments} />

        <AppointmentForm appointments={appointments} setAppointments={setAppointments} />

      </div>
    </main>
  );
}
