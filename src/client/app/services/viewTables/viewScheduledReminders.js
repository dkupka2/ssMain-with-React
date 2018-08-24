import { convertPiValues } from "../";

export const viewScheduledReminders = row => {
  let { DESC, CONDITION, ACTIVE, DOW, TIME, INCLUDE, EXCLUDE, MSG_TYPES } = row;
  return {
    DESC,
    CONDITION,
    ACTIVE: ACTIVE ? "" : "NO",
    DOW: convertPiValues(DOW, "days of the week"),
    TIME,
    INCLUDE: convertPiValues(INCLUDE, "holidays"),
    EXCLUDE: convertPiValues(EXCLUDE, "holidays"),
    MSG_TYPES
  };
};
