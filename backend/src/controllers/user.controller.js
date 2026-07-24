import Lead from "../models/user.model.js";

export const userController = async (req, res) => {
  const { name, email, budget, message } = req.body;

  const lead = await Lead.create({
    name,
    email,
    budget,
    message,
  });

  res.status(201).json({ message: "Lead created successfully", lead });
};
