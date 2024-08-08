import { NextResponse } from 'next/server'

export const GET = async () => {
    try {
        const posts = { country: "dk" }

        return NextResponse.json({ message: "ok", posts }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: "error", error: error }, { status: 500 })
    }
}