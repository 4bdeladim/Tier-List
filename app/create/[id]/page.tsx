import TierList from "@/components/TierList";



export default function New(id:CreatePageProp){
	return (
		<main className="flex w-full h-screen bg-white justify-center items-center">
			<TierList id={id.params.id} />
		</main>
	)
}