"use client"
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import Image from 'next/image';


const DraggableItem: React.FC<DraggedItemProps> = ({ id, img, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-200 min-w-[100px] aspect-square relative"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <Image fill src={img} alt="Item" />
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
