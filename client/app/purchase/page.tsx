"use client";

import { useEffect, useState } from "react";
import MustSignIn from "@/components/homemade/must_sign_in";

interface UserPurchaseItemProps {
	imgLink: string;
	bookName: string;
	price: string;
	purchaseDate: string;
}

const UserPurchaseItem = ({
	imgLink,
	bookName,
	price,
	purchaseDate,
}: {
	imgLink: string;
	bookName: string;
	price: string;
	purchaseDate: string;
}) => {
	return (
		<div className="flex justify-between items-center w-full border-b py-4">
			<div className="flex items-center gap-4">
				<img
					src={imgLink}
					alt="Empty"
					className="w-16 h-16 rounded-lg"
				/>

				<div className="flex flex-col gap-1">
					<p className="font-semibold">{bookName}</p>
					<p className="text-xs font-light">{purchaseDate}</p>
				</div>
			</div>
			<p className="font-semibold text-sm">${price}</p>
		</div>
	);
};

export default function PurchasePage() {
	const [username, setUsername] = useState("");
	const [listOfPurchase, setListOfPurchase] = useState<
		UserPurchaseItemProps[] | []
	>([]);

	useEffect(() => {
		const username = sessionStorage.getItem("user");
		if (username) {
			setUsername(username);
		}
	});

	return (
		<>
			{username === "" ? (
				<MustSignIn pageName="Purchase History" />
			) : (
				<div className="max-w-xl mx-auto w-full">
					{listOfPurchase.length === 0 ? (
						<>
							<div className="w-full h-full flex justify-center items-center gap-4 flex-col py-8 md:py-24">
								<h1 className="text-xl font-semibold">
									Purchase page
								</h1>
								<p>You have not purchased a book yet</p>
							</div>
						</>
					) : (
						<div className="w-full flex flex-col ">
							{listOfPurchase?.map((purchase) => (
								<UserPurchaseItem
									key={purchase.bookName}
									imgLink={purchase.imgLink}
									bookName={purchase.bookName}
									price={purchase.price}
									purchaseDate={purchase.purchaseDate}
								/>
							))}
						</div>
					)}
				</div>
			)}
		</>
	);
}
