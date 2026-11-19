import getOverviewStats from "../utils/OverviewStats.js";

const getOverview = async (req, res) => {
  try {
    const { period = "7d" } = req.query;

    const data = await getOverviewStats(period);

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Dashboard overview error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard overview",
    });
  }
};

export default getOverview;