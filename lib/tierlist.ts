import axios from "axios"
export const saveToLocalStorage = (list:List[]) => {
	localStorage.setItem("tier-list", JSON.stringify(list));
}

export const getFromLocalStorage = () => {
	const tierList = localStorage.getItem("tier-list")
	if(tierList){
		return JSON.parse(tierList) as List[]
	}
	return [];
}


export const saveTierList = async (tierList: TierList) => {
	try {
		const { data } = await axios.post(`/api/tier-list/${tierList.id}`, {tierList})
		console.log(data)
	} catch (error) {
		console.log(error)
	}
}