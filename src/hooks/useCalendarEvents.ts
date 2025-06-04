import { useState, useEffect } from 'react';
import { CalendarEvent } from '@/types/calendar';

export function useCalendarEvents() {
  const [events, setEvents] = useState<CalendarEvent[]>(() => {
    const savedEvents = localStorage.getItem('calendarEvents');
    if (savedEvents) {
      try {
        // Parse stored events and convert date strings back to Date objects
        const parsedEvents = JSON.parse(savedEvents);
        return parsedEvents.map((event: any) => ({
          ...event,
          date: new Date(event.date)
        }));
      } catch (e) {
        console.error('Failed to parse saved events', e);
        return [];
      }
    }
    return [];
  });

  // Save events to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('calendarEvents', JSON.stringify(events));
  }, [events]);

  const addEvent = (event: CalendarEvent) => {
    setEvents(prevEvents => [...prevEvents, event]);
  };

  const removeEvent = (eventId: string) => {
    setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
  };

  return { events, addEvent, removeEvent };
}