"use client"
import React, { useEffect, useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { DndContext } from '@/context/DndContext';
import DroppableList from './DroppableList';
import { cardsData } from '@/lib/CardsData';

const TierList = () => {
  const [data, setData] = useState<Cards[]>([]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newData = [...data];
    const destinationList = newData.find((droppableRow) => droppableRow.id === destination.droppableId);
    const sourceList = newData.find((droppableRow) => droppableRow.id === source.droppableId);
    if (destinationList && sourceList) {
      const draggedItem = sourceList.items[source.index];
      sourceList.items.splice(source.index, 1);
      destinationList.items.splice(destination.index, 0, draggedItem);
    }
    setData(newData);
  };

  useEffect(() => {
    setData(cardsData);
  }, []);

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div className="flex flex-col justify-center my-20 mx-4 w-[1200px] rounded-lg">
        {data.map((val, index) => (
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
    </DndContext>
  );
};

export default TierList;
