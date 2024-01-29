interface Item {
  id: string;
  content: string;
}

interface List {
  id: string;
  title: string;
  items: Item[];
}

interface Cards {
	id: string;
	title: string;
	bg: string;
	items: {
			id: string;
			name: string;
	}[];
}