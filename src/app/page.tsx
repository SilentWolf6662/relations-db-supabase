import { dbClient } from "@/lib/client";

type City = { id: number; name: string; };
type Country = { id: number; name: string; cities: City[]; };

export default async function Home() {
	const supabase = dbClient

	const { data, error } = await supabase.from('countries').select(`id, name, cities (id, name)`)
	if (error) throw error

	return (
		<>
			{data &&
				data.map((country: Country, index: number) => (
					<div key={country.id}>
						<div className="font-bold">{country.name}</div>
						{country.cities.length > 0 &&
							country.cities.map((city: City, index: number) => (
								<div key={city.id} className="">
									{city.name}
								</div>
							))
						}
					</div>
				))
			}
		</>
	);
}
