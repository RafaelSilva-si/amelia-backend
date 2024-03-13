import App from '.';
import AuthRoute from './routes/auth.routes';
import ServiceRoute from './routes/service.routes';
import UserRoute from './routes/users.routes';

const app = new App([new AuthRoute(), new UserRoute(), new ServiceRoute()]);

app.listen();
