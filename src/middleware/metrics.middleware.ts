import promBundle, { Middleware } from "express-prom-bundle";

const metricsMiddleware: Middleware = promBundle({
  includeMethod: true,
  includePath: true,
  metricsPath: "/metrics",
});

export default metricsMiddleware;
