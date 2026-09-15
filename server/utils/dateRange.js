export function getDateRange(period = "7d") {
  const now = new Date();
  let currentStart;
  let currentEnd = new Date(now);
  currentEnd.setHours(0, 0, 0, 0);
  currentEnd.setDate(currentEnd.getDate() + 1);
  console.log("period:", period);
  switch (period) {
    case "7d": {
      currentStart = new Date(currentEnd);
      currentStart.setDate(currentEnd.getDate() - 7);
      break;
    }
    case "30d": {
      currentStart = new Date(currentEnd);
      currentStart.setDate(currentEnd.getDate() - 30);
      break;
    }
    case "month": {
      currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    }
    default:
      throw new Error("Invalid period");
  }

  // Previous Period
  const duration = currentEnd.getTime() - currentStart.getTime();
  const previousEnd = new Date(currentStart);
  const previousStart = new Date(previousEnd.getTime() - duration);

  return {
    current: {
      start: currentStart,
      end: currentEnd,
    },
    previous: {
      start: previousStart,
      end: previousEnd,
    },
  };
}
