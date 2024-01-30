import { DropResult } from "@hello-pangea/dnd";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TierList = {
	rows: [
		{
			id: "1",
			title: "S",
			bg: "#FF7374", 
			items: [
				{
					id: "11",
					img: "/test/js.png"
				},
				{
					id: "12",
					img: "/test/ts.png"
				},
			]
		},
		{
			id: "2",
			title: "A",
			bg: "#FFB774",
			items: [
				
			]
		},
		{
			id: "3",
			title: "B",
			bg: "#FFDA74",
			items: [
				
			]
		}
	
	
	],
	uploadedItems: [{id: "22", img: "/test/ts.png"}, {id: "3", img: '/test/js.png' }]
}
const tierListSlice = createSlice({
    name: "tierList",
    initialState,
    reducers: {
        changePosition(state, action: PayloadAction<DropResult>) {
            if(state.rows && state.uploadedItems) {
                const result = action.payload;
                const { source, destination } = result;
                if (!destination) return;
                if (
                    source.droppableId === destination.droppableId &&
                    source.index === destination.index
                )
                    return;
                const newData = [...state.rows];
                const destinationList = newData.find(
                    (droppableRow) =>
                        droppableRow.id === destination.droppableId
                );
                const sourceList = newData.find(
                    (droppableRow) => droppableRow.id === source.droppableId
                );
                if (
                    source.droppableId === "uploaded-items" &&
                    destinationList
                ) {
                    const draggedItem = state.uploadedItems[source.index];
                    destinationList.items.splice(
                        destination.index,
                        0,
                        draggedItem
                    );
                    state.uploadedItems = state.uploadedItems.filter(
                        (item) => item.id !== draggedItem.id
                    );
                    return;
                }
                if (
                    destination.droppableId === "uploaded-items" &&
                    sourceList
                ) {
                    const draggedItem = sourceList.items[source.index];
                    const uploadedItemsCopy = [...state.uploadedItems];
                    uploadedItemsCopy.splice(destination.index, 0, draggedItem);
                    sourceList.items.splice(source.index, 1);
                    state.uploadedItems = uploadedItemsCopy;
                } else if (destinationList && sourceList) {
                    const draggedItem = sourceList.items[source.index];
                    sourceList.items.splice(source.index, 1);
                    destinationList.items.splice(
                        destination.index,
                        0,
                        draggedItem
                    );
                }
                state.rows = newData;
            }
        },

        setRows(state, action: PayloadAction<List[]>) {
            state.rows = action.payload;
        },

				uploadItem(state, action:PayloadAction<DroppableItem[]>){
					state.uploadedItems = [...state.uploadedItems, ...action.payload]
				}
    },
});

export const { changePosition, uploadItem } = tierListSlice.actions;
export default tierListSlice;
