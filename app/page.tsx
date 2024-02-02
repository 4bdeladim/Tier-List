"use client"
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useLazyGetUniqueIdQuery } from "@/store/services/tierlist";
import { useEffect } from "react";
import { redirect } from "next/navigation";

export default function Home() {
	const [getId, { data:id, isFetching }] = useLazyGetUniqueIdQuery();
	useEffect(() => {
		if(id && !isFetching){
			redirect(`/edit/${id}`)
		}
	}, [id])
  return (
    <main className="flex min-h-screen w-full justify-center items-center max-w-full">
				<Button onClick={() => getId()}>
					{
						isFetching ? <LoadingSpinner /> : "Create new TierList"
					}
				</Button>
    </main>
  );
}
