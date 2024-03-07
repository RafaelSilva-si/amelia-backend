import App from '.';
import AuthRoute from './routes/auth.routes';
import UserRoute from './routes/users.routes';

const app = new App([new AuthRoute(), new UserRoute()]);

app.listen();
