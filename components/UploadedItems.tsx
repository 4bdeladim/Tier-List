"use client"
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from './DraggableItem';
import { useSelector } from 'react-redux';




const UploadedItems = () => {
	const uploadedItems = useSelector((state:Store) => state.tierList.uploadedItems)
  return (
    <div className="w-full max-w-[1000px] flex flex-wrap fixed bottom-24 rounded-lg" style={{ height: uploadedItems.length > 0 ? `${Math.ceil(uploadedItems.length / 10 ) * 100}px` : "100px", background: uploadedItems.length === 0 ? "#F5F5F5" : "transparent" }}>
      <Droppable direction="horizontal" droppableId="uploaded-items">
        {(provided) => (
          <div className="w-full max-w-full" {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex max-w-full flex-wrap">
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
