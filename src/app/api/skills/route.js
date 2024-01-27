import connect from "@/lib/db"
import skills from "../../../../models/skillSchema"
import { NextResponse } from "next/server"


export async function POST(request) {
    const { name, proficiency, description } = await request.json()
    await connect()
    await skills.create({
        name, proficiency, description
    })
    return NextResponse.json({ message: "Skill Add" }, { status: 201 })
}

export async function GET() {
    await connect();
    const allSkills = await skills.find();
    return NextResponse.json({ allSkills }, { status: 200 })
}




