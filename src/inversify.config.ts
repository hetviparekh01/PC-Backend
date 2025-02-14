import { Container } from "inversify";
import { TYPES } from "./constants";
import { AuthMiddleware } from "./middlewares";
import { AuthService, CategoryService, UserService } from "./services";

const container=new Container()

container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<AuthMiddleware>(TYPES.AuthMiddleware).to(AuthMiddleware);
container.bind<AuthService>(TYPES.AuthService).to(AuthService);
container.bind<CategoryService>(TYPES.CategoryService).to(CategoryService);
export default container