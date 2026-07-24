import Lead from "../models/user.model.js";

export const leadController = async (req, res) => {
  try {
    const leads = await Lead.find();
    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
    });
  } catch (error) {
    console.error("Error fetching leads:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error.message,
    });
  }
};
