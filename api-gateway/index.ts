import Elysia from "elysia";
import cors from "@elysiajs/cors";
import {
  UserRoute,
  AcademicRoute,
  AuthenticationRoute,
  AuthorizationRoute,
  CourseRoute,
  LMSRoute,
  FileServerRoute,
} from "./src/routes";

const app = new Elysia()
  .use(
    cors({
      origin: ["http://localhost:5173", "http://192.168.0.13:5173", "http://172.18.0.11:5173", "http://frontend:5173"],
    })
  )
  .get("/", () => {
    "API Gateway is running :D";
  })
  .use(UserRoute)
  .use(AcademicRoute)
  .use(AuthorizationRoute)
  .use(AuthenticationRoute)
  .use(CourseRoute)
  .use(LMSRoute)
  .use(FileServerRoute)
  .listen(3000);
