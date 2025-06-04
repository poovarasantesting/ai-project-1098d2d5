interface CalendarHeaderProps {
  currentDate: Date;
}

export function CalendarHeader({ currentDate }: CalendarHeaderProps) {
  const formattedDate = currentDate.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-700 mb-4">{formattedDate}</h2>
      <div className="grid grid-cols-7 mb-2">
        {daysOfWeek.map((day) => (
          <div 
            key={day} 
            className="text-center font-medium text-sm py-2 text-gray-500"
          >
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}