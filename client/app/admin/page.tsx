import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Admin() {
	return (
		<div className="absolute top-0 w-screen h-full z-50 bg-white">
			<section className="flex justify-center items-center min-h-screen">
				<Card className="min-w-96">
					<CardHeader>
						<CardTitle>
							<p className="text-center font-mono">Admin Page</p>
						</CardTitle>
						<form className="flex flex-col gap-5 pt-4">
							<div className="text-sm flex flex-col gap-2">
								<label>Username</label>
								<Input type="text" />
							</div>
							<div className="text-sm flex flex-col gap-2">
								<label>Password</label>
								<Input type="password" />
							</div>
							<Button className="w-fit">Login</Button>
						</form>
					</CardHeader>
				</Card>
			</section>
		</div>
	);
}
