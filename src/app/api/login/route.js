import { users } from "../../../data";
import jwt from "jsonwebtoken";

const SECRET_KEY = "supersecretkey123";

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const user = users.find(
      (u) => u.username === username && u.password === password && u.isActive && !u.isDeleted
    );
    
    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { 
        userId: user.id.toString(),
        username: user.username, 
        role: user.role,
        email: user.email
      },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    
    return Response.json({success: true, token });
  } catch (error) {
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
} 