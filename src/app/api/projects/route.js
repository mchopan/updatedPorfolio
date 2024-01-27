import connect from "@/lib/db"
import projects from "../../../../models/projectSchema"
import { NextResponse } from "next/server"


export async function POST(request) {
    const { title, description, link, technologies } = await request.json()
    await connect()
    await projects.create({
        title, description, link, technologies
    })
    return NextResponse.json({ message: "Project Added" }, { status: 201 })
}

export async function GET() {
    await connect();
    const allProjects = await projects.find();
    return NextResponse.json({ allProjects }, { status: 200 })
}



