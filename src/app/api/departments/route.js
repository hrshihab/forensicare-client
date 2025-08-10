import { departments } from "../../../data";

export async function GET() {
  try {
    const activeDepartments = departments.filter(d => d.isActive);
    return Response.json(activeDepartments);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 