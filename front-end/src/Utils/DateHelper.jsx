// A helper function to add ordinal suffix to a day number
/**
 * Helper to show dates in Month day year format
 * @param {*} day 
 * @returns 
 */
const getOrdinalSuffix = (day) => {
    const j = day % 10,
      k = day % 100;
    if (j === 1 && k !== 11) {
      return `${day}st`;
    }
    if (j === 2 && k !== 12) {
      return `${day}nd`;
    }
    if (j === 3 && k !== 13) {
      return `${day}rd`;
    }
    return `${day}th`;
  };
  
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Get the full month name (e.g., May)
    const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${getOrdinalSuffix(day)} ${year}`;
  };

  