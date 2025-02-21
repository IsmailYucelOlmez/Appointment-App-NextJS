
import AppointmentDataTable from "@/components/AppointmentDataTable";
import AppointmentForm from "@/components/AppointmentForm";


export default function Home() {
  

  return (
    <main className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        <AppointmentDataTable />

        <AppointmentForm  />

      </div>
    </main>
  );
}
