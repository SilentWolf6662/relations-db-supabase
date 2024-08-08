import { FormEvent, useState } from "react";

import Draggable from "react-draggable";

type data = {
	show: boolean;
};

const Modal = (props: data) => {
	const [country, setCountry] = useState<string>('');

	if (!props.show) return null;

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		console.log("POST the posted POST post");
		e.preventDefault();
		const submitData = { country }

		try {
			const res = await fetch('http://localhost:3000/api/countries/add', {
				method: 'POST',
				body: JSON.stringify(submitData),
				headers: {
					'content-type': 'application/json'
				}
			})

			console.log(res);
			res.ok ? console.log("ok") : console.log("not ok")

		} catch (error) {
			console.log(error);
		}
	}

	return (
		<Draggable>
			<section className="grid place-items-center mt-20 z-50 draggable-box">
				<div className="shadow-md w-96">
					<div className="bg-black text-white p-1 font-bold">Create a country</div>
					<div>
						<form onSubmit={handleSubmit} className="grid justify-center mt-2">
							<div className="mb-2">
								<input
									className="border border-gray-600 rounded-md text-sm p-2 w-full bg-gray-700"
									type="text"
									name="country"
									placeholder="Enter a country"
									onChange={e => setCountry(e.target.value)}
								/>
							</div>
							<div className="flex justify-end my-2">
								<button
									type="submit"
									className="rounded-md bg-black w-40 text-white font-bold py-2">
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			</section>
		</Draggable>
	)
}
export default Modal;