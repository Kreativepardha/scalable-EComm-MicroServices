import rateLimit from "express-rate-limit";
import helmet from "helmet";

export const applySecurityMiddleware = (app: any) => {
  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 100,
      max: 100,
    }),
  );
};
