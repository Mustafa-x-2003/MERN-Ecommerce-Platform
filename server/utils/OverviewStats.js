import { getDateRange } from "./dateRange.js";
import Order from "../models/orderModel.js";

export default async function getOverviewStats(period = "7d") {
  const { current, previous } = getDateRange(period);
  //   orders
  const currentOrders = await Order.countDocuments({
    createdAt: {
      $gte: current.start,
      $lt: current.end,
    },
  });
  const previousOrders = await Order.countDocuments({
    createdAt: {
      $gte: previous.start,
      $lt: previous.end,
    },
  });
  const change =
    previousOrders === 0
      ? 0
      : ((currentOrders - previousOrders) / previousOrders) * 100;
// ============
  return {
    orders: {
      current: currentOrders,
      previous: previousOrders,
      change: Number(change.toFixed(2)),
    },
  };
}
