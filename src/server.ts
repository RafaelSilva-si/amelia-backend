import App from ".";
import UserRoute from "./routes/users.routes";

const app = new App([new UserRoute()]);

app.listen();
