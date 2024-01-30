"use client"
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from './DraggableItem';
import { useSelector } from 'react-redux';




const UploadedItems = () => {
	const uploadedItems = useSelector((state:Store) => state.tierList.uploadedItems)
  return (
    <div className="w-[1200px] min-h-[100px] flex fixed bottom-24 bg-white rounded-lg">
      <Droppable direction="horizontal" droppableId="uploaded-items">
        {(provided) => (
          <div className="w-full" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex">
              {uploadedItems?.map((component, index) => (
                <DraggableItem key={component.id} id={component.id} img={component.img} index={index} />
              ))}
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
			
    </div>
  );
};

export default UploadedItems;
