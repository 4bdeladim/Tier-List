
interface List {
  id: string;
  title: string;
	bg: string;
  items: DroppableItem[];
}

interface Cards {
	id: string;
	title: string;
	bg: string;
	items: DroppableItem[];
}


interface DroppableItem { 
	id: string,
	img: string
}

interface DraggedItemProps {
  id: string;
  img: string;
  index: number;
}

interface DroppableListProps {
  id: string;
  title: string;
  bg: string;
	roundedTop: boolean;
	roundedBottom: boolean
  items: DroppableItem[];
}



interface TierList {
	rows: List[] | null,
	uploadedItems: DroppableItem[]
}

interface Store {
	tierList: TierList
}

