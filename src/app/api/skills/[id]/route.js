import connect from "@/lib/db";
import skills from "../../../../../models/skillSchema";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
    const { id } = params;
    const { name, proficiency, description } = await request.json()
    await connect();
    await skills.findByIdAndUpdate(id, { name, proficiency, description })
    return NextResponse.json({ message: "Skill Updated" }, { status: 200 })
}

export async function GET(request, { params }) {
    const { id } = params;
    await connect();
    const skill = await skills.findById({ _id: id })
    return NextResponse.json({ skill })
}

export async function DELETE(request, { params }) {
    const id = params.id
    console.log(id)
    await connect();
    await skills.findByIdAndDelete(id);
    return NextResponse.json({ message: "Skill deleted" }, { status: 200 })
}