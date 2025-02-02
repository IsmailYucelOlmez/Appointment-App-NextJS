import { PrismaClient } from '@prisma/client';
import { NextResponse } from "next/server";


const prisma = new PrismaClient();
// GET - Tüm randevuları getir
export async function GET() {
    try {
        const appointments = await prisma.appointment.findMany({
            include: {
                user: true,
                service: true,
            },
        });
        return NextResponse.json(appointments);
    } catch (error) {
        return NextResponse.json({ error: "Randevular getirilemedi" }, { status: 500 });
    }
}

// POST - Yeni randevu oluştur
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { userId, serviceId, date, time, status } = body;

        const appointment = await prisma.appointment.create({
            data: {
                userId,
                serviceId,
                date,
                time,
                status: status || "PENDING",
            },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: "Randevu oluşturulamadı" }, { status: 500 });
    }
}

// PUT - Randevu güncelle
export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, status } = body;

        const appointment = await prisma.appointment.update({
            where: { id },
            data: { status },
        });

        return NextResponse.json(appointment);
    } catch (error) {
        return NextResponse.json({ error: "Randevu güncellenemedi" }, { status: 500 });
    }
}

// DELETE - Randevu sil
export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "ID gerekli" }, { status: 400 });
        }

        await prisma.appointment.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Randevu silindi" });
    } catch (error) {
        return NextResponse.json({ error: "Randevu silinemedi" }, { status: 500 });
    }
}