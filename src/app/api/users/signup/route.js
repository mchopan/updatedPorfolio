import connect from "@/lib/db"
import user from "../../../../../models/userSchema"
import { NextResponse } from "next/server"


export async function POST(request) {
    const { username, password } = await request.json()
    await connect()
    const userExist = await user.findOne({ username })
    if (userExist) {
        return NextResponse.json({ message: "username already taken" }, { status: 400 })

    }
    await user.create({
        username, password
    })
    return NextResponse.json({ message: "accound created" }, { status: 201 })
}
