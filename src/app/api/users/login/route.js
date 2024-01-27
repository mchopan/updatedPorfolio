import connect from "@/lib/db"
import user from "../../../../../models/userSchema"
import { NextResponse } from "next/server"


export async function POST(request) {
    const { username, password } = await request.json()
    await connect()

    const foundUser = await user.findOne({ username });

    if (!foundUser) {
        return NextResponse.json({ message: "User Not Found" }, { status: 404 })

    }

    if (foundUser.password !== password) {
        return NextResponse.json({ message: "Invalid password" }, { status: 401 })

    }

    return NextResponse.json({ foundUser }, { status: 200 })
}

export async function GET() {
    await connect();
    const users = await user.find();
    return NextResponse.json({ users }, { status: 200 })

}