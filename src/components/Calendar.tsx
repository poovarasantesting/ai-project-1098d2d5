import { useState } from 'react';
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth,
  isSameDay,
  isToday
} from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get start of week offset
  const startDay = monthStart.getDay();
  
  // Navigation handlers
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(new Date());
  };
  
  // Day selection handler
  const handleDayClick = (day: Date) => {
    setSelectedDate(day);
    console.log(`Selected: ${format(day, 'MMMM d, yyyy')}`);
  };
  
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Simple Calendar</h1>
          <p className="text-slate-600 dark:text-slate-400">
            {selectedDate ? `Selected: ${format(selectedDate, 'MMMM d, yyyy')}` : 'Select a date'}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
          {/* Calendar header with navigation */}
          <div className="flex items-center justify-between p-4 border-b dark:border-slate-700">
            <Button variant="outline" size="icon" onClick={previousMonth}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex gap-4 items-center">
              <h2 className="text-xl font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </h2>
              <Button variant="outline" size="sm" onClick={goToToday}>
                Today
              </Button>
            </div>
            
            <Button variant="outline" size="icon" onClick={nextMonth}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b dark:border-slate-700">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div 
                key={day} 
                className="p-2 text-center text-sm font-medium text-slate-600 dark:text-slate-400"
              >
                {day}
              </div>
            ))}
          </div>
          
          {/* Calendar grid */}
          <div className="grid grid-cols-7">
            {/* Empty cells for days before the start of month */}
            {Array.from({ length: startDay }).map((_, index) => (
              <div key={`empty-${index}`} className="p-2 h-16 border-b border-r dark:border-slate-700" />
            ))}
            
            {/* Actual days of the month */}
            {daysInMonth.map((day) => {
              const isCurrentMonth = isSameMonth(day, currentDate);
              const isSelected = isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);
              
              return (
                <div 
                  key={day.toString()}
                  className={`
                    relative p-2 h-16 border-b border-r dark:border-slate-700
                    ${!isCurrentMonth ? 'text-slate-400 dark:text-slate-600' : ''}
                    cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors
                  `}
                  onClick={() => handleDayClick(day)}
                >
                  <div 
                    className={`
                      flex items-center justify-center w-8 h-8 rounded-full
                      ${isSelected ? 'bg-blue-600 text-white' : ''}
                      ${isTodayDate && !isSelected ? 'border border-blue-600 text-blue-600' : ''}
                    `}
                  >
                    {format(day, 'd')}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}