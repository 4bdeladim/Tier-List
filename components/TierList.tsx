"use client"
import React, { useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { DndContext } from '@/context/DndContext';
import DroppableList from './DroppableList';
import UploadedItems from './UploadedItems';
import UploadImage from './UploadImage';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePosition, deleteRow, editRow, saveRow, setId, setRows, uploadItem } from '@/store/slices/tier-list';
import { editIcon } from './EditIcon';
import AlertDialogComponent from './AlertDialog';
import { TrashIcon } from './TrashIcon';
import RowDialog from './RowDialog';

import { addRowBtn } from './AddRowBtn';
import { getFromLocalStorage } from '@/lib/tierlist';


const TierList: React.FC<{id: string}> = ({id}) => {
	const dispatch = useDispatch()
	const data = useSelector((state:Store) => state.tierList.rows)
  const onDragEnd = (result: DropResult) => {
    dispatch(changePosition(result))
  };
	
	useEffect(() => {
		const getListFromLocalStorage = () => {
			const list = getFromLocalStorage();
			dispatch(setRows(list))
		}
		dispatch(setId(id))
		getListFromLocalStorage();
	}, [])
	
  return (
    <DndContext onDragEnd={onDragEnd}>
			<div className="flex flex-col">
				<RowDialog confirmBtnTitle="Add" button={addRowBtn} title="Add Row" onConfirm={saveRow} />
				<div className="flex flex-col justify-center my-4 w-[1200px] rounded-lg list ">
					
					{data?.map((val, index) => (
						<div key={index} className="flex">
							<div className="px-4 flex justify-between items-center gap-4">
								<RowDialog confirmBtnTitle="Edit"  button={editIcon} onConfirm={editRow} title="Edit row" defaultBg={val.bg} defaultRowName={val.title} rowId={val.id}  />
								<AlertDialogComponent button={TrashIcon} params={val.id} onConfirm={deleteRow} title="Are you sure you want to delete this row ?" description="All items in this row will be deleted with it"  />
							</div>
							<div
							className={`w-full flex ${
								index === 0 ? 'rounded-t-lg' : ''
							} ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}
							>
								<DroppableList isBgGrey={index % 2 === 0} roundedTop={index===0} roundedBottom={index===data.length-1} id={val.id} title={val.title} bg={val.bg} items={val.items} />
							</div>
						</div>
					))}
				</div>
				<UploadedItems />
				<div className="fixed bottom-6">
					<UploadImage  setImages={uploadItem} />
				</div>
				
			</div>
    </DndContext>
  );
};

export default TierList;
