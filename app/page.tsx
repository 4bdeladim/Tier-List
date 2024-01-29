import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full justify-center items-center">
			<Link href="/create">
				<Button>
					Create new TierList
				</Button>
			</Link>
    </main>
  );
}
