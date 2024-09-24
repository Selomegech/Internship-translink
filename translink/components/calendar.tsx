import React, { useState } from 'react';
import {
    format,
    startOfToday,
    startOfYesterday,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    eachDayOfInterval,
    addMonths,
    subMonths,
} from 'date-fns';

interface CalendarProps {
    onDateSelect: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ onDateSelect }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [markedDates, setMarkedDates] = useState<Set<string>>(new Set());
    const [selectedOption, setSelectedOption] = useState<string>('today');

    const firstDayOfMonth = startOfMonth(currentMonth);
    const lastDayOfMonth = endOfMonth(currentMonth);
    const startDate = startOfWeek(firstDayOfMonth);
    const endDate = endOfWeek(lastDayOfMonth);
    
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const handleDateClick = (date: Date) => {
        onDateSelect(date);
    };

    const handlePrevMonth = () => {
        setCurrentMonth(subMonths(currentMonth, 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(addMonths(currentMonth, 1));
    };

    const handleDropdownChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const option = event.target.value;
        setSelectedOption(option);
        const newMarkedDates = new Set<string>();

        switch (option) {
            case 'today':
                newMarkedDates.add(format(startOfToday(), 'yyyy-MM-dd'));
                break;
            case 'yesterday':
                newMarkedDates.add(format(startOfYesterday(), 'yyyy-MM-dd'));
                break;
            case 'thisWeek':
                const start = startOfWeek(new Date());
                const end = endOfWeek(new Date());
                eachDayOfInterval({ start, end }).forEach(day => {
                    newMarkedDates.add(format(day, 'yyyy-MM-dd'));
                });
                break;
            case 'thisMonth':
                const monthStart = startOfMonth(new Date());
                const monthEnd = endOfMonth(new Date());
                eachDayOfInterval({ start: monthStart, end: monthEnd }).forEach(day => {
                    newMarkedDates.add(format(day, 'yyyy-MM-dd'));
                });
                break;
            default:
                break;
        }

        setMarkedDates(newMarkedDates);
    };

    return (
        <div className="bg-white rounded-lg shadow-md pt-16  w-72">
            <header className="flex justify-between items-center mb-4">
                <button onClick={handlePrevMonth} className="text-gray-200 hover:text-gray-800">
                    &lt;
                </button>
                <h2 className="text-xl font-semibold">{format(currentMonth, 'MMMM yyyy')}</h2>
                <button onClick={handleNextMonth} className="text-gray-200 hover:text-gray-800">
                    &gt;
                </button>
            </header>

            <select
                value={selectedOption}
                onChange={handleDropdownChange}
                className="mb-4 p-2 border  border-gray-300 rounded-md"
            >
                <option value="today">Today</option>
                <option value="yesterday">Yesterday</option>
                <option value="thisWeek">This Week</option>
                <option value="thisMonth">This Month</option>
            </select>

            <div className="grid grid-cols-7 gap-2">
                {days.map((day) => {
                    const isMarked = markedDates.has(format(day, 'yyyy-MM-dd'));
                    const isToday = format(day, 'yyyy-MM-dd') === format(startOfToday(), 'yyyy-MM-dd');

                    return (
                        <div key={day.toString()} className="text-center">
                            <button
                                onClick={() => handleDateClick(day)}
                                className={`w-full h-full p-3 rounded-full transition-colors duration-150 
                                    ${isMarked ? 'bg-green-300 text-white' : isToday ? 'bg-green-200 font-bold' : 'bg-transparent text-gray-800'} 
                                    hover:bg-green-300 hover:text-white`}
                            >
                                {format(day, 'd')}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;