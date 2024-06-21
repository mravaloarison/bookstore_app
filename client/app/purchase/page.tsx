export default function PurchasePage() {
	return (
		<div className=" py-4 max-w-xl mx-auto w-full">
			<div className="w-full flex flex-col ">
				<div className="flex justify-between items-center w-full border-b p-4">
					<div className="flex items-center gap-4">
						<img
							src="https://cdn.dribbble.com/userupload/10983678/file/original-feb63cb0a7ace43fbefe0b47ada8cc17.png?resize=1504x1128&vertical=center"
							alt="Empty"
							className="w-16 h-16 rounded-lg"
						/>

						<div className="flex flex-col gap-1">
							<p className="font-semibold">Name of book here.</p>
							<p className="text-xs font-light">
								July, 23th, 2024 12:00 PM
							</p>
						</div>
					</div>
					<p className="font-semibold text-sm">$12.40</p>
				</div>
			</div>
			<>
				{/* <div className="w-full h-full flex justify-center items-center gap-4 flex-col">
					<h1 className="text-xl font-semibold">Purchase page</h1>
					<p>Books you purchased will appear here</p>
				</div> */}
			</>
		</div>
	);
}
