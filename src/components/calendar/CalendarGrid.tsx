import { CalendarEvent } from "@/types/calendar";

interface CalendarGridProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDateClick: (date: Date) => void;
}

export function CalendarGrid({ currentDate, events, onDateClick }: CalendarGridProps) {
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  
  const today = new Date();
  const isToday = (date: Date) => {
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
             eventDate.getMonth() === date.getMonth() &&
             eventDate.getFullYear() === date.getFullYear();
    });
  };

  const renderDays = () => {
    const days = [];
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-24 md:h-28 border border-gray-200 p-1 bg-gray-50"></div>
      );
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayEvents = getEventsForDate(date);
      
      days.push(
        <div 
          key={day} 
          className={`h-24 md:h-28 border border-gray-200 p-1 relative hover:bg-gray-50 cursor-pointer transition-colors ${
            isToday(date) ? 'bg-blue-50' : ''
          }`}
          onClick={() => onDateClick(date)}
        >
          <div className="flex justify-between items-start">
            <span className={`text-sm font-medium ${
              isToday(date) ? 'bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center' : ''
            }`}>
              {day}
            </span>
          </div>
          <div className="mt-1 space-y-1 max-h-[80%] overflow-y-auto">
            {dayEvents.map((event) => (
              <div 
                key={event.id} 
                className="text-xs bg-blue-100 text-blue-800 rounded px-1 py-0.5 truncate"
                title={`${event.title} - ${event.time}`}
              >
                {event.time} {event.title}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return days;
  };

  return (
    <div className="grid grid-cols-7 border-t border-l border-gray-200">
      {renderDays()}
    </div>
  );
}