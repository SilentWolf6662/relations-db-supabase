import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

const supabase = dbClient

export const POST = async (req: NextRequest) => {
	const data = await req.json()
	console.log(data)
	const { error } = await supabase
		.from('countries')
		.insert({ name: data.country })
	return NextResponse.json(data)
}
