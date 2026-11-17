import api from "@/Service/api/axios";
export const getOverviewStats = (period) =>
  api.get("/admin/overview", {
    params: {
      period,
    },
  });
