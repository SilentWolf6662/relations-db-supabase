import { dbClient } from '@/lib/client'

const supabase = dbClient

export const getAllData = async () => {
	const { data, error } = await supabase
		.from('countries')
		.select(`id, name, cities (id, name)`)

	if (error) throw error

	return { data }
}
