import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import { agentRouter } from '../modules/agent/agent.routes';
import { creatorRouter } from '../modules/creator/creator.routes';
import { tripsRouter } from '../modules/trips/trips.routes';
import { partnershipRouter } from '../modules/partnership/partnership.routes';

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
  {
    path: '/creator',
    route: creatorRouter,
  },
  {
    path: '/trip',
    route: tripsRouter,
  },
  {
    path: '/partnership',
    route: partnershipRouter,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
