import SaveTierList from "@/components/SaveTierList";
import ShareTierList from "@/components/ShareTierList";
import TierList from "@/components/TierList";
import TierListLock from "@/components/TierListLock";



export default function New(id:CreatePageProp){
	return (
		<main className="flex w-full h-screen bg-white justify-center items-center">
			<div className="flex gap-4 fixed top-28">
				<TierListLock />
				<ShareTierList />
				<SaveTierList />
			</div>
			
			<TierList id={id.params.id} />
		</main>
	)
}