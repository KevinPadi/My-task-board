import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true, minlength: 3 },
  description: { type: String, default: "" },
  icon: { type: String, default: "✅" },
  status: { type: String, default: null }
}, { timestamps: true });

export const Task = mongoose.model("Task", taskSchema);
