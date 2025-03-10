import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
  subMonths
} from 'date-fns';
import React, { useEffect, useRef, useState } from 'react';
import { FiCalendar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

type MinDateMode = 'today' | 'future' | 'any';

interface Props {
  selectedStart?: Date | null;
  selectedEnd?: Date | null;
  label?: string;
  errors?: string;
  isRange?: boolean;
  minDateMode?: MinDateMode;
  onSubmit?: (range: { start: Date | null; end: Date | null }) => void;
}

const CustomDatePicker: React.FC<Props> = ({
  selectedStart,
  selectedEnd,
  label,
  errors,
  isRange = true,
  minDateMode = 'any',
  onSubmit
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({
    start: selectedStart ?? null,
    end: isRange ? selectedEnd ?? null : null
  });

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  // Fungsi navigasi bulan
  const prevMonth = (): void => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };
  const nextMonth = (): void => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  // Generate hari dalam bulan ini
  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(currentMonth)),
    end: endOfWeek(endOfMonth(currentMonth))
  });

  // Validasi tanggal berdasarkan `minDateMode`
  const isDateDisabled = (date: Date): boolean => {
    const today = new Date();
    if (minDateMode === 'today') return isBefore(date, today);
    if (minDateMode === 'future') return isBefore(date, today);
    return false;
  };

  // Handle klik tanggal
  const handleDateClick = (date: Date): void => {
    if (isDateDisabled(date)) return;

    if (!isRange) {
      setSelectedRange({ start: date, end: null });
      return;
    }

    if (
      selectedRange.start == null ||
      (selectedRange.start && selectedRange.end != null)
    ) {
      setSelectedRange({ start: date, end: null });
    } else {
      if (selectedRange.start && isBefore(date, selectedRange.start)) {
        setSelectedRange({ start: date, end: selectedRange.start });
      } else {
        setSelectedRange({ ...selectedRange, end: date });
      }
    }
  };

  // Handle klik di luar modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (
        modalRef.current != null &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full">
      {label !== undefined && (
        <label className="block text-sm font-bold text-black mb-2">
          {label}
        </label>
      )}

      {/* Input DatePicker */}
      <button
        className={`w-full flex justify-between bg-white border  ${
          errors !== undefined ? 'border-red-500' : 'border-gray-700'
        } p-3 rounded-[10px] font-normal text-[16px] text-black hover:border-seeds-green focus:outline-none focus:border-seeds-green  focus:shadow-seeds-green  focus:shadow-center  transition duration-200`}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="text-gray-600">
          {selectedRange.start != null
            ? isRange && selectedRange.end != null
              ? `${format(selectedRange.start, 'dd/MM/yyyy')} - ${format(
                  selectedRange.end,
                  'dd/MM/yyyy'
                )}`
              : format(selectedRange.start, 'dd/MM/yyyy')
            : isRange
            ? 'DD/MM/YYYY - DD/MM/YYYY'
            : 'DD/MM/YYYY'}
        </span>
        <FiCalendar className="text-gray-500 shrink-0" size={20} />
      </button>

      {/* Modal DatePicker */}
      {isOpen && (
        <div
          ref={modalRef}
          className="absolute z-50 left-0 mt-2 w-full bg-white shadow-lg rounded-lg p-4"
        >
          {/* Header Navigasi */}
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={prevMonth}
              className="p-2 text-gray-700 hover:bg-gray-200 rounded-full"
            >
              <FiChevronLeft size={20} />
            </button>
            <span className="text-lg text-black font-semibold">
              {format(currentMonth, 'MMMM yyyy')}
            </span>
            <button
              onClick={nextMonth}
              className="p-2 text-gray-700 hover:bg-gray-200 rounded-full"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          {/* Grid Kalender */}
          <div className="grid grid-cols-7 text-center text-black">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="font-normal">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const isSelected =
                selectedRange.start != null &&
                isSameDay(day, selectedRange.start);
              const isInRange =
                selectedRange.start != null &&
                selectedRange.end != null &&
                isWithinInterval(day, {
                  start: selectedRange.start,
                  end: selectedRange.end
                });
              const isEnd =
                selectedRange.end != null && isSameDay(day, selectedRange.end);

              return (
                <button
                  key={index}
                  onClick={() => {
                    handleDateClick(day);
                  }}
                  className={`transition flex justify-center ${
                    isSelected
                      ? isInRange
                        ? 'my-2 bg-[#DCFCE4] text-white rounded-l-full'
                        : 'my-2 hover:bg-gray-100'
                      : isEnd
                      ? isInRange
                        ? 'my-2 bg-[#DCFCE4] text-white rounded-r-full'
                        : 'my-2 hover:bg-gray-100'
                      : isInRange
                      ? 'px-2 my-2 bg-[#DCFCE4] text-black'
                      : 'px-2 my-2 hover:bg-gray-100'
                  }`}
                >
                  <div
                    className={`transition ${
                      isSelected || isEnd
                        ? 'w-8 h-8 flex items-center justify-center bg-[#27A590] text-white rounded-full'
                        : 'py-1 '
                    } ${isDateDisabled(day) ? 'text-gray-400' : 'text-black'}`}
                  >
                    {format(day, 'd')}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Tombol Submit */}
          <button
            onClick={() => {
              if (onSubmit != null) onSubmit(selectedRange);
              setIsOpen(false);
            }}
            className="w-full mt-4 py-2 bg-seeds-button-green text-white font-semibold rounded-full"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
