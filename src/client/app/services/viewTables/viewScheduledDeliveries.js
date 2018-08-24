import { convertPiValues } from "../";

export const viewScheduledDeliveries = row => {
  let { CONTACT, DAYS, EXCLUDE, TIME, ACTIVE } = row;
  return {
    CONTACT,
    DAYS: convertPiValues(DAYS, "days of the week"),
    EXCLUDE: convertPiValues(EXCLUDE, "holidays"),
    TIME,
    ACTIVE: ACTIVE ? "" : "NO"
  };
};
