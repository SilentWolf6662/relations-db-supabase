import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

type RouteParams = {
	params: {
		id: string
	}
}

const supabase = dbClient

export const GET = async (req: NextRequest, route: RouteParams) => {
    const countryId = route.params.id

    let { data: countryWithCilies, error } = await supabase.from('countries').select(`*, cities (id, name)`).eq('id', countryId)

    if (error) {
        return NextResponse.json({ error: "Error fetching data" }, { status: 500 })
    }

    if (!countryWithCilies) {
        return NextResponse.json({ error: "Country not found" }, { status: 404 })
    }

    return NextResponse.json({ country: countryWithCilies }, { status: 200 })
}