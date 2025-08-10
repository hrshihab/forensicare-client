import { users } from "../../../data";

export async function GET() {
  try {
    const activeUsers = users.filter(u => u.isActive && !u.isDeleted);
    return Response.json(activeUsers);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 