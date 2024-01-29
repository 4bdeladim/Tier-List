"use client"
import React from 'react';
import { Draggable } from '@hello-pangea/dnd';

interface DraggedItemProps {
  id: string;
  name: string;
  index: number;
}

const DraggableItem: React.FC<DraggedItemProps> = ({ id, name, index }) => {
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div
          className="bg-gray-200 h-full w-[100px]"
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          {name}
        </div>
      )}
    </Draggable>
  );
};

export default DraggableItem;
