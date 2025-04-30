import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfToday
} from 'date-fns';
import React, { useEffect, useState} from 'react';
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid";

const classNames = (...classes: any[]): string => {
    return classes.filter(Boolean).join(' ');
};

const colStartClasses: string[] = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7'
];

const isEqualIgnoringTime = (
    date1: Date | undefined | null,
    date2: Date | undefined | null
): boolean =>
    !!date1 &&
    !!date2 &&
    isEqual(new Date(date1)?.setHours(0, 0, 0, 0), new Date(date2)?.setHours(0, 0, 0, 0));

const sortDates = (date1: Date | null | undefined, date2: Date | null | undefined) =>
    (!!date1 &&
        !!date2 &&
        new Date(date1).setHours(0, 0, 0, 0) - new Date(date2).setHours(0, 0, 0, 0)) || -1

const isBetweenIgnoringTime = (
    rawDate: Date | undefined | null,
    dates: Array<Date | undefined | null>
): boolean => {

    const date = !!rawDate && new Date(rawDate)?.setHours(0, 0, 0, 0);
    const sortedDates = dates.sort(sortDates);
    const firstRawDate = sortedDates[0];
    const lastRawDate = sortedDates.at(-1);

    const firstDate = !!firstRawDate && new Date(firstRawDate)?.setHours(0, 0, 0, 0);
    const lastDate = !!lastRawDate && new Date(lastRawDate)?.setHours(0, 0, 0, 0);

    return !!date && date > firstDate && date < lastDate
}

export const DatePickerTemplate: React.FC<{
    isInterval?: boolean;
    className?: string;
    values?: Array<Date>;
    value?: Date;
    onChange?: Function;
}> = ({isInterval, className = '', value, onChange, values}) => {
    const [selectedDays, setSelectedDays] = useState<Array<Date | undefined>>([]);
    const [currentMonth, setCurrentMonth] = useState(format(values?.at(0) ?? startOfToday(), 'MMM-yyyy'));
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', startOfToday());

    const days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth)
    });

    const previousMonth = (): void => {
        const firstDayNextMonth = add(firstDayCurrentMonth, {months: -1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    };

    const nextMonth = (): void => {
        const firstDayNextMonth = add(firstDayCurrentMonth, {months: 1});
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
    };

    const setSelectedDay = (value: Date) => {
        if (!isInterval){
            setSelectedDays([value]);
            onChange?.(value);
            return;
        }

        const newSelectedDays = selectedDays.filter(f => isEqualIgnoringTime(f, value)).length > 0 ? selectedDays :
            (selectedDays.length === 2 ? [value] : [...selectedDays, value].sort(sortDates));
        setSelectedDays(newSelectedDays);
        onChange?.(newSelectedDays);
    }

    useEffect(() => {
        setCurrentMonth(format(startOfToday(), 'MMM-yyyy'));
    }, []);

    useEffect(() => {
        if (!isInterval && !!value) {
            setCurrentMonth(format(value, 'MMM-yyyy'));
            setSelectedDays([value]);
        }
    }, [isInterval, value]);

    return (
        <div className={className}>
            <div>
                <div className='flex items-center'>
                    <h2 className='flex-auto font-semibold text-gray-900'>
                        {format(firstDayCurrentMonth, 'MMMM yyyy')}
                    </h2>
                    <button
                        type='button'
                        onClick={previousMonth}
                        className='-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                    >
                        <span className='sr-only'>Previous month</span>
                        <ChevronLeftIcon className='w-5 h-5' aria-hidden='true'/>
                    </button>
                    <button
                        onClick={nextMonth}
                        type='button'
                        className='-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500'
                    >
                        <span className='sr-only'>Next month</span>
                        <ChevronRightIcon className='w-5 h-5' aria-hidden='true'/>
                    </button>
                </div>
                <div className='grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500'>
                    <div>S</div>
                    <div>M</div>
                    <div>T</div>
                    <div>W</div>
                    <div>T</div>
                    <div>F</div>
                    <div>S</div>
                </div>
                <div className='grid grid-cols-7 mt-2 text-sm'>
                    {days.map((day, dayIdx) => (
                        <div
                            key={day.toString()}
                            className={classNames(dayIdx === 0 && colStartClasses[getDay(day)], 'py-1.5')}
                        >
                            <button
                                type='button'
                                onClick={() => {
                                    setSelectedDay(day);
                                }}
                                className={classNames(
                                    (isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1))) && 'text-white',
                                    isBetweenIgnoringTime(day, selectedDays) && 'text-white',
                                    !(isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1)) || (isBetweenIgnoringTime(day, selectedDays) && isInterval)) && isToday(day) && 'text-primary',
                                    !(isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1)) || (isBetweenIgnoringTime(day, selectedDays) && isInterval)) &&
                                    !isToday(day) &&
                                    isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-900',
                                    !(isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1)) || (isBetweenIgnoringTime(day, selectedDays) && isInterval)) &&
                                    !isToday(day) &&
                                    !isSameMonth(day, firstDayCurrentMonth) &&
                                    'text-gray-400',
                                    (isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1))) && 'bg-primary',
                                    (isBetweenIgnoringTime(day, selectedDays) && isInterval) && 'bg-primary200',
                                    !(isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1))) && 'hover:bg-gray-200',
                                    ((isEqualIgnoringTime(day, selectedDays[0]) || isEqualIgnoringTime(day, selectedDays.at(-1))) || isToday(day)) && 'font-semibold',
                                    'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                )}
                            >
                                <time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
