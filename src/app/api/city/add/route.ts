import { NextRequest, NextResponse } from 'next/server'

import { dbClient } from '@/lib/client'

const supabase = dbClient

export const POST = async (req: NextRequest, res: NextResponse) => {
	//** expect country and city as request data */

	let countryId //** global var for holding the country id */

	const data = await req.json()

	console.log(data)

	const cityName = data.city.toLowerCase()

	// Check if the city already exists
	const { data: existingCity, error: cityError } = await supabase
		.from('cities')
		.select('*')
		.eq('name', cityName)

	if (cityError) {
		return new Response(cityError.message, { status: 400 })
	}

	if (existingCity && existingCity.length > 0) {
		return new Response(
			JSON.stringify({ error: 'Dine data eksistere allerede' }),
			{
				status: 409
			}
		)
	}

	// Get the country id from the countries table
	const { data: country, error: countryError } = await supabase
		.from('countries')
		.select('id')
		.eq('name', data.country)

	if (countryError) {
		return new Response(countryError.message, { status: 400 })
	} else if (country.length > 0) {
		countryId = country[0].id
	}

	if (!country) {
		return new Response('Country not found', { status: 404 })
	}

	// Insert the city name data into the cities table
	const { error: insertError } = await supabase.from('cities').insert({
		name: cityName[0].toUpperCase() + cityName.slice(1),
		country_id: countryId
	})

	if (insertError) {
		return new Response(insertError.message, { status: 400 })
	}

	return new Response('City inserted successfully', { status: 201 })
}
