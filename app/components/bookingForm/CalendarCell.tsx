import { useRef } from "react";
import { useCalendarCell, useFocusRing, mergeProps } from "react-aria";
import { CalendarState } from "react-stately";
import {
  CalendarDate,
  isToday,
  getLocalTimeZone,
} from "@internationalized/date";
import { cn } from "@/lib/utils";

export function CalendarCell({
  state,
  date,
  isUnavailable,
}: {
  state: CalendarState;
  date: CalendarDate;
  currentMonth: CalendarDate;
  isUnavailable?: boolean;
}) {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  const isTodayDate = isToday(date, getLocalTimeZone());
  const finallyIsDisabled = isDisabled || isUnavailable;

  return (
    <td
      {...cellProps}
      className={`py-0.5 px-0.5 relative ${isFocusVisible ? "z-10" : "z-0"}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className="size-10 sm:size-12 outline-none group rounded-md"
      >
        <div
          className={cn(
            "size-full rounded-md flex items-center justify-center text-sm font-semibold cursor-pointer",
            isSelected ? "bg-primary text-white" : "",
            finallyIsDisabled ? "text-muted-foreground cursor-not-allowed" : "",
            !isSelected && !finallyIsDisabled ? "bg-secondary" : ""
          )}
        >
          {formattedDate}
          {isTodayDate && (
            <div
              className={cn(
                "absolute bottom-3 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-1.5 bg-primary rounded-full",
                isSelected && "bg-white"
              )}
            />
          )}
        </div>
      </div>
    </td>
  );
}
