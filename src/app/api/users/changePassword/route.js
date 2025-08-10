import { users } from "../../../../data";
import { verifyToken } from "../../../../utils/auth";

export async function PUT(request) {
  try {
    const userData = verifyToken(request);
    if (!userData) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { username } = userData;
    const { oldPassword, newPassword } = await request.json();

    const user = users.find(u => u.username === username);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (user.password !== oldPassword) {
      return Response.json({ message: "Old password incorrect" }, { status: 400 });
    }

    user.password = newPassword;
    user.updatedAt = new Date().toISOString();

    return Response.json({ message: "Password changed successfully" });
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 