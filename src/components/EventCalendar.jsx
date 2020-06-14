import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Text, UnstyledButton, Icon } from "../components/styles";
import { useSelectors } from "../redux";
import { getEventsByDate } from "../selectors";
import { datePartsToString } from "../utils";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function firstDayOfMonth(year, month) {
  const date = new Date(year, month, 1);
  return (date.getDay() + 6) % 7;
}

function lengthOfMonth(year, month) {
  const date = new Date(year, (month + 1) % 12, 0);
  return date.getDate();
}

function getRows(year, month) {
  let dayI = firstDayOfMonth(year, month);
  let rowI = 0;
  const rows = [0, 1, 2, 3, 4, 5].map((_) => days.map((_) => false));

  for (let i in [...Array(lengthOfMonth(year, month))]) {
    rows[rowI][dayI] = parseInt(i) + 1;
    if (dayI === 6) {
      dayI = 0;
      rowI += 1;
    } else {
      dayI += 1;
    }
  }

  return rows;
}

function Cell({ year, month, day, today, events }) {
  const dayStr = datePartsToString(year, month, day);
  const isToday = dayStr === today;
  const event = events[dayStr];
  const backgroundColor = event ? "primary500" : isToday ? "lightGray" : "";
  const fontWeight = event ? "bold" : isToday ? "semiBold" : "";
  const color = event ? "white" : "darkGray";

  const content = (
    <Box width="14.2856%" textAlign="center" p={1}>
      <Box
        height="3rem"
        width="3rem"
        borderRadius="100%"
        backgroundColor={backgroundColor}
        justifyContent="center"
      >
        <Text
          fontSize={1}
          textAlign="center"
          color={color}
          fontWeight={fontWeight}
        >
          {day}
        </Text>
      </Box>
    </Box>
  );

  return event ? <Link to={`/events/${event.id}`}>{content}</Link> : content;
}

function Rows({ year, month, events }) {
  const now = new Date();
  const todayStr = datePartsToString(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  return getRows(year, month)
    .filter((days) => days.some((day) => !!day))
    .map((days, rowNum) => (
      <Box
        key={rowNum}
        flexDirection="row"
        width="100%"
        justifyContent="space-evenly"
      >
        {days.map((day, idx) => (
          <Cell
            key={`${year}-${month}-${day}-${idx}`}
            year={year}
            month={month}
            day={day}
            events={events}
            today={todayStr}
          />
        ))}
      </Box>
    ));
}

export default function EventCalendar() {
  const [events] = useSelectors(getEventsByDate);
  const now = new Date();
  const [date, setDate] = useState({
    year: now.getFullYear(),
    month: now.getMonth()
  });

  function incMonth() {
    if (date.month === 11) {
      setDate({ month: 0, year: date.year + 1 });
    } else {
      setDate({ month: date.month + 1, year: date.year });
    }
  }

  function decMonth() {
    if (date.month === 0) {
      setDate({ month: 11, year: date.year - 1 });
    } else {
      setDate({ month: date.month - 1, year: date.year });
    }
  }

  return (
    <Box pl={2} pr={2} pb={2} borderBottom="veryLightGray">
      <Box pt={3} pb={2} flexDirection="row" justifyContent="space-between">
        <Box>
          <UnstyledButton onClick={decMonth}>
            <Icon name="navigate_before" />
          </UnstyledButton>
        </Box>
        <Text fontWeight="semiBold" textAlign="center">
          {months[date.month]}
        </Text>
        <Box>
          <UnstyledButton onClick={incMonth}>
            <Icon name="navigate_next" />
          </UnstyledButton>
        </Box>
      </Box>
      <Box>
        <Box
          flexDirection="row"
          width="100%"
          justifyContent="space-evenly"
          py={2}
        >
          {days.map((day) => (
            <Box key={day} width="14.2856%">
              <Text fontSize={1} textAlign="center" color="darkGray">
                {day}
              </Text>
            </Box>
          ))}
        </Box>
        <Rows year={date.year} month={date.month} events={events} />
      </Box>
    </Box>
  );
}
