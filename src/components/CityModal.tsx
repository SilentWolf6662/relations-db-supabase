//src/components/CityModal.tsx
"use client";

import { FormEvent, useState } from "react";

import Draggable from "react-draggable";

type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};

const CityModal = (props: { show: boolean; countries: Country[] }) => {
    const [country, setCountry] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [cityExist, setCityExist] = useState<Boolean | null>(null);

    //let cityExistRef = useRef<HTMLDivElement | null>(null);
    if (!props.show) return null;
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData = { country, city }
        // const submitData = { countryId: country, city };

        console.log(submitData);
        const selectBox = document.querySelector("#mySelect") as HTMLSelectElement;
        const selectedValue = selectBox.value;

        // Check if a value is selected
        if (selectedValue == "") {
            alert("Please select an option from the dropdown.");
            return false; // Prevent form submission
        }

        try {
            const res = await fetch('http://localhost:3000/api/city/add', {
                method: 'POST',
                body: JSON.stringify(submitData),
                headers: {
                    'content-type': 'application/json'
                }
            })
            if (res.ok) {
                setCityExist(false);
                console.log("City is now added");
            } else if (res.status === 409) {
                console.log("Your data already exists");
                setCityExist(true);
            } else {
                console.log("Server error");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Draggable>
            <section className="grid justify-center mt-20 z-53 inset-x-0 draggable-box">
                <div className="shadow-md w-96">
                    <div className="bg-black text-white p-1 font-bold">Create a city</div>
                    <form onSubmit={handleSubmit} className="grid justify-center mt-2">
                        <div>
                            <select
                                className="select select-bordered w-full max-w-xs mSelect"
                                name="country"
                                value={country}
                                id="mySelect"
                                onChange={(e) => setCountry(e.target.value)}
                            >
                                <option value="" disabled>Select a country</option>

                                {props.countries &&
                                    props.countries.map((country: Country) => (
                                        <option
                                            key={country.id}
                                            value={country.name}
                                        >
                                            {country.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="my-2">
                            <input
                                className="border border-gray-600 rounded-md text-sm p-2 w-full bg-gray-700"
                                type="text"
                                name="country"
                                placeholder="Enter a city"
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>

                        <div className="flex justify-end my-2">
                            <button type="submit" className="rounded-md bg-black w-40 text-white font-bold py-2">
                                Create a city
                            </button>
                        </div>
                    </form>

                    {cityExist !== null && (
                        <div className="p-2">
                            {cityExist ? "The city is already created" : "The city is now added"}
                        </div>
                    )}
                </div>
            </section>
        </Draggable>
    )
}

export default CityModal;