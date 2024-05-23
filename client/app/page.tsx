"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
	const [searchValue, setSearchValue] = useState("");
	const searchAction = () => {
		// Endpoints: https://www.googleapis.com/books/v1/volumes?q=

		// Change all the spaces to a plus sign
		// REGEX: /\s/g == " "
		const searchQuery = searchValue.replace(/\s/g, "+");
	};

	const userTyped = (value: string) => {
		setSearchValue(value);
		// console.log(value);
	};

	return (
		<main>
			<section className="min-h-screen flex justify-center items-center">
				<div className="flex w-full max-w-sm items-center space-x-2">
					<Input
						type="search"
						value={searchValue}
						placeholder="Search"
						onChange={(event) => userTyped(event.target.value)}
					/>
					<Button onClick={searchAction}>Search</Button>
				</div>
			</section>
		</main>
	);
}
