import { users } from "../../../../data";

export async function GET(request, { params }) {
  try {
    const { id } = params;

    const user = users.find(u => u.id === parseInt(id) && u.isActive && !u.isDeleted);

    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    return Response.json(user);
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 