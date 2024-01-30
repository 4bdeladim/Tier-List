"use client"
import React, {  useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { DndContext } from '@/context/DndContext';
import DroppableList from './DroppableList';
import UploadedItems from './UploadedItems';
import UploadImage from './UploadImage';
import NewRow from './NewRow';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { changePosition, uploadItem } from '@/store/slices/tier-list';

const TierList = () => {
	const [uploadedItems, setUploadedItems] = useState<DroppableItem[]>([]);
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
						<div
							key={index}
							className={`w-full flex ${index % 2 === 0 ? 'bg-white' : 'bg-[#F5F5F5]'} ${
								index === 0 ? 'rounded-t-lg' : ''
							} ${index === data.length - 1 ? 'rounded-b-lg' : ''}`}
						>
							<DroppableList roundedTop={index===0} roundedBottom={index===data.length-1} id={val.id} title={val.title} bg={val.bg} items={val.items} />
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
