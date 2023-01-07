import React, { useCallback } from 'react';
import AddEventButton from './AddEventButton';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const EventBar = ({ events, setEvents, currentEvent, setCurrentEvent }) => {

  const handleAdd = useCallback(() => {
    const title = prompt('Enter the Title:');
    // Prevent Duplicated
    if (
      events.find((event) => event.title.toLowerCase() === title.toLowerCase())
    ) {
      alert('Event Already Existed');
      return;
    }
    // Add new event
    if (title)
      setEvents((prev) => [
        ...prev,
        {
          title,
          ['To do']: [],
          ['In progress']: [],
          ['Completed']: [],
        },
      ]);
  }, [events, setEvents]);

  const handleDragEnd = useCallback((result) => {
    console.log(result)
    if (!result.destination) return;
    const { source, destination } = result;
    const eventsCopy = [...events]
    const [eventd] = eventsCopy.splice(source.index, 1);
    eventsCopy.splice(destination.index, 0, eventd);
    setEvents(eventsCopy);

  }, [events, setEvents, currentEvent]);

  return (
    <div className='event-bar'>
      <h1 className='event-bar-title'>My Events</h1>
      <AddEventButton handleClick={handleAdd} />

      <DragDropContext onDragEnd={(result) => handleDragEnd(result)}>
        <div>
          <Droppable droppableId='eventbar'>
            {(provided) => {
              return (
                <div className='event-container'
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {events.map((item, index) => {
                    return (
                      <Draggable
                        draggableId={item.title}
                        key={item.title}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`event over-hide ${currentEvent.title === item.title ? 'selected-event' : ''}`}
                            onClick={() => setCurrentEvent(item)}
                          >
                            {item.title}
                          </div>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </div>
              );
            }}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};

export default EventBar;
