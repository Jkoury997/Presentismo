import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"

export default function DateFilter({ startDate, endDate, setStartDate, setEndDate }) {
  return (
    <div className="flex items-center gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex items-center justify-between w-40" variant="outline">
            <span>{startDate ? startDate.toLocaleDateString() : "Desde"}</span>
            <CalendarDaysIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            initialFocus
            mode="single"
            selected={startDate}
            onSelect={(date) => setStartDate(date)}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="flex items-center justify-between w-40" variant="outline">
            <span>{endDate ? endDate.toLocaleDateString() : "Hasta"}</span>
            <CalendarDaysIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto p-0">
          <Calendar
            initialFocus
            mode="single"
            selected={endDate}
            onSelect={(date) => setEndDate(date)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}


function CalendarDaysIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>)
  );
}
