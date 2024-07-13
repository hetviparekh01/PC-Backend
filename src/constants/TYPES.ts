import { AuthService } from "../services/auth.service";

export const TYPES={
    UserService:Symbol.for("UserService"),
    AuthMiddleware:Symbol.for("AuthMiddleware"),
    AuthService:Symbol.for("AuthService")
}