import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import Header from "@/components/homemade/header";
import Footer from "@/components/homemade/footer";
import { Toaster } from "@/components/ui/sonner";

import Navigation from "@/components/homemade/lg_navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="min-h-screen flex justify-between flex-col w-full">
					<Header />
					<div className="flex flex-col min-h-[82vh] h-full">
						<div className="hidden md:flex pt-4 w-full">
							<Navigation />
						</div>
						{children}
					</div>
					<Footer />
				</main>
				<Toaster richColors position="top-center" />
			</body>
		</html>
	);
}
