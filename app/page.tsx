import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full justify-center items-center">
			<Link href="/create/new">
				<Button>
					Create new TierList
				</Button>
			</Link>
    </main>
  );
}
