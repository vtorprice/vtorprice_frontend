import React from "react";
import "dayjs/locale/ru";
import { RangeCalendar } from "@mantine/dates";
import CalendarIcon from "@assets/icons/24_calendar.svg";
import { useBoolean } from "@box/shared/hooks";
import { AppInput } from "../input";
import { Popover } from "../popover";
import { IDatePicker } from "./types";
import { humanizeDates } from "./lib";

export const DatePicker: React.FC<IDatePicker> = ({
  containerSize,
  value,
  onChange,
  amountOfMonths = 2,
  inputStyle = "w-[400px]",
  maxDate,
  ...inputProps
}) => {
  const { value: showCalendar, toggle, setValue } = useBoolean(false);
  const handleInputFocus = () => {
    setValue(true);
  };

  return (
    <Popover
      width={amountOfMonths * 300}
      containerSize={containerSize}
      opened={showCalendar}
      center
      close={() => setValue(false)}
    >
      <Popover.Target>
        <AppInput
          value={humanizeDates(value)}
          inputInactive
          className={inputStyle}
          onClick={handleInputFocus}
          placeholder="Дата размещения"
          iconRight={
            <CalendarIcon
              onClick={(ev: MouseEvent) => {
                ev.stopPropagation();
                toggle();
              }}
            />
          }
          {...inputProps}
        />
      </Popover.Target>
      <Popover.Dropdown>
        <div className="rounded-[10px] bg-white p-[20px] shadow">
          <RangeCalendar
            value={value}
            onChange={onChange}
            sx={{
              maxWidth: "100%",
            }}
            locale="ru"
            amountOfMonths={amountOfMonths}
            maxDate={maxDate}
          />
        </div>
      </Popover.Dropdown>
    </Popover>
  );
};
