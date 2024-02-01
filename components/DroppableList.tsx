"use client"
import React from 'react';
import { Droppable } from '@hello-pangea/dnd';
import DraggableItem from './DraggableItem';


const DroppableList: React.FC<DroppableListProps> = ({ id, title, bg, items, roundedBottom, roundedTop, isBgGrey }) => {
  return (
    <div className="w-full flex">
			
      <div style={{ background: bg }} className={`w-[100px] flex justify-center items-center text-center text-2xl px-4 text-white font-bold ${roundedBottom ? "rounded-bl-lg" : ""} ${roundedTop ? "rounded-tl-lg" : ""} `}>
        {title}
      </div>
      <Droppable direction="horizontal" droppableId={id}>
        {(provided) => (
          <div className={`min-h-[100px] w-full flex ${isBgGrey ? "bg-[#F5F5F5]" : "bg-white"}`} {...provided.droppableProps} ref={provided.innerRef}>
            <div className="flex flex-wrap ">
              {items.map((component, index) => (
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

export default DroppableList;
