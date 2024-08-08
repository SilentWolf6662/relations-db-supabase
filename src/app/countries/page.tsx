"use client";

import { ChangeEvent, useEffect, useState } from "react";

import CityModal from "@/components/CityModal";
import Modal from "@/components/Modal";
import UploadModal from "@/components/UploadModal";
import { getAllData } from "@/components/countryData";

type City = {
    id: number;
    name: string;
};

type Country = {
    id: number;
    name: string;
    cities: City[];
};

type Data = {
    data: Country[];
};

const page = () => {
    const [country, setCountry] = useState<string>("");
    const [allData, setAllData] = useState<Country[] | null>(null);
    const [dataById, getDataById] = useState<any>(null);

    const [showModal, setShowModal] = useState<boolean>(false); // false from start
    const [showCityModal, setShowCityModal] = useState<boolean>(false); // false from start
    const [showImageModal, setShowImageModal] = useState<boolean>(false); // false from start

    const openModal = () => showModal ? setShowModal(false) : setShowModal(true);
    const openCityModal = () => showCityModal ? setShowCityModal(false) : setShowCityModal(true);
    const openImageModal = () => showImageModal ? setShowImageModal(false) : setShowImageModal(true);

    useEffect(() => {
        (async () => {
            try {
                const alldata: Data = await getAllData();
                const data = alldata.data
                setAllData(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        })()

    }, []);

    const getCountries = async (e: ChangeEvent<HTMLSelectElement>) => {
        const selectBox = document.querySelector("#mySelect") as HTMLSelectElement;
        setCountry(selectBox.value);

        const selectedValue = selectBox.value;
        try {
            const response = await fetch(`http://localhost:3000/api/countries/${selectedValue}`);

            if (!response.ok) {
                throw new Error(`Failed to fetch data`);
            }

            const data = await response.json();

            getDataById(data.country[0].cities.sort(function (a: City, b: City) {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            }));
        } catch (error) {
            console.error("Error fetching data:", error);
            // Parse an error message to the user
        }
        //console.log(`Selected option: ${selectedValue}`);
    }

    return (
        <div className="draggable-container">
            <header>
                <div className="grid grid-cols-3 gap-4 p-2 bg-black text-white">
                    <div className="col-span-2">Countries</div>
                    <div id="shit" className="grid grid-cols-3 w-96 justify-self-end">
                        <button onClick={openModal}>Create a country</button>
                        <button onClick={openCityModal}>Create a city</button>
                        <button onClick={openImageModal}>Upload a image</button>
                    </div>
                </div>
            </header>

            <nav>
                <select className="mSelect" value={country} id="mySelect" onChange={getCountries}>
                    <option value="" disabled>Select a country</option>
                    {allData &&
                        allData
                            .sort((a: Country, b: Country) => a.name.localeCompare(b.name))
                            .map((country: Country) => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))
                    }
                </select>
            </nav>

            <section className="m-2 z-10 absolute">
                {dataById &&
                    dataById.map((city: City, index: number) => (
                        <div key={city.id}>{city.name}</div>
                    ))
                }
            </section>

            <Modal show={showModal} />
            {allData && <CityModal show={showCityModal} countries={allData} />}
            {allData && <UploadModal show={showImageModal} />}
        </div>
    )
}

export default page;