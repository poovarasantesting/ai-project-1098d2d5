import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { AddEventDialog } from "@/components/calendar/AddEventDialog";
import { useCalendarEvents } from "@/hooks/useCalendarEvents";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isAddEventOpen, setIsAddEventOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { toast } = useToast();
  const { events, addEvent } = useCalendarEvents();

  const handlePreviousMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setIsAddEventOpen(true);
  };

  const handleAddEvent = (title: string, time: string) => {
    if (selectedDate) {
      const [hours, minutes] = time.split(':').map(Number);
      const eventDate = new Date(selectedDate);
      eventDate.setHours(hours, minutes);
      
      addEvent({
        id: Date.now().toString(),
        title,
        date: eventDate,
        time
      });
      
      toast({
        title: "Event added",
        description: `${title} on ${eventDate.toLocaleDateString()} at ${time}`
      });
      
      setIsAddEventOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Calendar</h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleToday}>
                Today
              </Button>
              <Button variant="outline" size="icon" onClick={handlePreviousMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleNextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button 
                onClick={() => {
                  setSelectedDate(new Date());
                  setIsAddEventOpen(true);
                }}
                size="sm"
              >
                <Plus className="h-4 w-4 mr-1" /> Add Event
              </Button>
            </div>
          </div>
          
          <CalendarHeader currentDate={currentDate} />
          <CalendarGrid 
            currentDate={currentDate} 
            events={events}
            onDateClick={handleDateClick}
          />
        </div>
      </div>
      
      {selectedDate && (
        <AddEventDialog
          isOpen={isAddEventOpen}
          onClose={() => setIsAddEventOpen(false)}
          onAddEvent={handleAddEvent}
          date={selectedDate}
        />
      )}
    </div>
  );
}