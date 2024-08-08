import { NextRequest, NextResponse } from 'next/server'

import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL!,
	process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export const POST = async (req: NextRequest, res: NextResponse) => {
	let cityId //** global var for holding the city id */

	const data = await req.json() //getting the data
	console.log(data)

	const { data: city, error: cityError } = await supabase // find id by name
		.from('cities')
		.select('id')
		.eq('name', data.city)

	if (cityError) {
		return new Response(cityError.message, { status: 400 })
	} else if (city.length > 0) {
		cityId = city[0].id //setting the global cityId to city id to use later

		console.log(`The city id again ${cityId}`)
	}

	if (!city) {
		return new Response('City not found', { status: 404 })
	}

	// Insert the city name data into the cities table
	const { error: insertError } = await supabase.from('city-images').insert({
		name: data.fileName,
		city_id: cityId //the global cityId reference
	})

	if (insertError) {
		return new Response(insertError.message, { status: 400 })
	}

	return new Response('City inserted successfully', { status: 201 })
}
