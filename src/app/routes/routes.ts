import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { agentRouter } from '../modules/agent/agent.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/agent',
    route: agentRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
