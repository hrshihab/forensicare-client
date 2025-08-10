import { users } from "../../../../data";
import { verifyToken } from "../../../../utils/auth";

export async function PUT(request) {
  try {
    const userData = verifyToken(request);
    if (!userData) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { username } = userData;
    const { profileImage } = await request.json();

    const user = users.find(u => u.username === username);
    if (!user) {
      return Response.json({ message: "User not found" }, { status: 404 });
    }

    if (profileImage) {
      user.profileImage = profileImage;
      user.updatedAt = new Date().toISOString();
    }

    return Response.json({ message: "Profile image updated", user });
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 