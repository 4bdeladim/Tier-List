
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
	isBgGrey: boolean
  items: DroppableItem[];
}



interface TierList {
	isLocked: boolean
	rows: List[] | null,
	id: string,
	uploadedItems: DroppableItem[]
}

interface Store {
	tierList: TierList
}


interface CreatePageProp {
  params: {
    id: string;
  };
  searchParams: Record<string, never>;
}

