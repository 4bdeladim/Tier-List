"use client"
import React from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { DndContext } from '@/context/DndContext';
import DroppableList from './DroppableList';
import UploadedItems from './UploadedItems';
import UploadImage from './UploadImage';
import NewRow from './NewRow';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePosition, deleteRow, uploadItem } from '@/store/slices/tier-list';
import EditIcon from './EditIcon';
import AlertDialogComponent from './AlertDialog';
import { TrashIcon } from './TrashIcon';


const TierList = () => {
	const dispatch = useDispatch()
	const data = useSelector((state:Store) => state.tierList.rows)
  const onDragEnd = (result: DropResult) => {
    dispatch(changePosition(result))
  };


  return (
    <DndContext onDragEnd={onDragEnd}>
			<div className="flex flex-col">
				<NewRow />
				<div className="flex flex-col justify-center my-4 w-[1200px] rounded-lg ">
					
					{data?.map((val, index) => (
						<div key={index} className="flex">
							<div className="px-4 flex justify-between items-center gap-4">
								<EditIcon /> 
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
