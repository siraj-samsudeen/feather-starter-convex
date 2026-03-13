import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Outlet,
  useMatches,
} from "@tanstack/react-router";
import React, { Suspense, useEffect } from "react";

const TanStackRouterDevtools =
  process.env.NODE_ENV === "production"
    ? () => null // Render nothing in production
    : React.lazy(() =>
        // Lazy load in development
        import("@tanstack/router-devtools").then((res) => ({
          default: res.TanStackRouterDevtools,
          // For Embedded Mode
          // default: res.TanStackRouterDevtoolsPanel
        })),
      );

function RootComponent() {
  const matches = useMatches();
  const matchWithTitle = [...matches]
    .reverse()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .find((d) => (d.context as Record<string, any>)?.title);
  const title =
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (matchWithTitle?.context as Record<string, any>)?.title ||
    "Feather Starter";

  useEffect(() => {
    document.title = title;
  }, [title]);

  return (
    <>
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  component: RootComponent,
});
