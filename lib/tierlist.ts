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