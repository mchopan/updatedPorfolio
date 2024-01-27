import connect from "@/lib/db";
import projects from "../../../../../models/projectSchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { title, description, link, technologies } = await request.json()
    await connect();
    await projects.findByIdAndUpdate(id, { title, description, link, technologies })
    return NextResponse.json({ message: "Projects Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connect();
    const project = await projects.findById({ _id: id })
    return NextResponse.json({ project })
}

export async function DELETE(request, { params }) {
    const id = params.id
    await connect();
    await projects.findByIdAndDelete(id);
    return NextResponse.json({ message: "Project deleted" }, { status: 200 })
}