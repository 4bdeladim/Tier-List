import { saveToLocalStorage } from "@/lib/tierlist";
import { DropResult } from "@hello-pangea/dnd";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: TierList = {
	id: "",
	isLocked: false,
	rows: [],
	uploadedItems: []
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
                }
                else if (
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
								saveToLocalStorage(state.rows);
            }
        },

        setRows(state, action: PayloadAction<List[]>) {
          state.rows = action.payload;
        },

				saveRow(state, action: PayloadAction<List>){
					if(state.rows){
						state.rows = [...state.rows, action.payload]
					}
					else state.rows = [action.payload]
					saveToLocalStorage(state.rows);
				},

				uploadItem(state, action:PayloadAction<DroppableItem[]>){
					state.uploadedItems = [...state.uploadedItems, ...action.payload]
					if(state.rows) saveToLocalStorage(state.rows);
				},

				deleteRow(state, action:PayloadAction<string>){
					if(state.rows) {
						state.rows = state.rows?.filter(row => row.id !== action.payload)
						saveToLocalStorage(state.rows);
					}
				},

				editRow(state, action: PayloadAction<List>){
					if(state.rows) {
						state.rows = state.rows.map(row => {
							if(row.id === action.payload.id){
								return {
									title: action.payload.title,
									bg: action.payload.bg,
									id: row.id,
									items: row.items
								}
							}
							return row
						})
						saveToLocalStorage(state.rows);
					}
				},

				changeLock(state){
					state.isLocked = !state.isLocked
					if(!localStorage.getItem("isLockAlertNotFirstTime")) localStorage.setItem("isLockAlertNotFirstTime", "true")
				},
				
				setId(state, action:PayloadAction<string>){
					state.id = action.payload
				}
    },
});

export const { changePosition, uploadItem, saveRow, deleteRow, editRow, setRows, changeLock, setId } = tierListSlice.actions;
export default tierListSlice;
