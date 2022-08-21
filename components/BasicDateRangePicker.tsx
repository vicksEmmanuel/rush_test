import { format, isValid, subDays } from 'date-fns';
import * as React from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export interface RangeType {
  startDate: Date;
  endDate: Date;
  key: 'selection';
}

export default function BasicDateRangePicker({
  setDateRange,
}: {
  setDateRange?(e: RangeType): void;
}) {
  const selection: RangeType = {
    startDate: subDays(new Date(), 30),
    endDate: new Date(),
    key: 'selection',
  };
  const [value, setValue] = React.useState<RangeType>(selection);
  const [isOpen, setIsOpen] = React.useState(false);

  const handleSelect = (ranges: { selection: RangeType }) => {
    setValue(ranges.selection);
  };

  React.useEffect(() => {
    if (value) {
      setDateRange?.(value);
    }
  }, [value]);

  return (
    <div className="overflow-scroll">
      <div
        className="relative z-50 w-full h-full bg-white px-4 rounded py-2 mt-1 items-center flex justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isValid(value?.startDate) && isValid(value?.endDate) && (
          <div className="flex flex-row cursor-pointer">
            {format(new Date(value?.startDate!), 'MMM dd, yyyy')} -{' '}
            {format(new Date(value?.endDate!), 'MMM dd, yyyy')}
            <div className="align-center flex items-center mx-2">
              {!isOpen ? (
                <IoIosArrowDown color="#000" />
              ) : (
                <IoIosArrowUp color="#000" />
              )}
            </div>
          </div>
        )}
      </div>

      {isOpen && (
        <div className="absolute z-50 md:left-[25%] lg:left-[30.5%]">
          <DateRangePicker
            ranges={[value]}
            moveRangeOnFirstSelection
            retainEndDateOnFirstSelection
            dragSelectionEnabled
            maxDate={new Date()}
            onChange={handleSelect as any}
          />
        </div>
      )}
    </div>
  );
}
