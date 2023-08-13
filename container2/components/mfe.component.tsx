import { Suspense, lazy } from "react";

import { MfeRemote, MfeProps } from "./types";
import { useLoadScript } from "./hooks";
import { MfeModule } from "./utils";


/**
 * Props for Micro Frontend component
 *
 * @interface MicroFrontendProps
 * @extends {MfeProps<P, E>}
 * @template P
 * @template E
 * @version 1.2.0
 */
interface MicroFrontendProps
extends MfeProps, Record<string, any> {
remote: MfeRemote;
}

/**
 * Micro Frontend loader
 *
 * @version 1.1.0
 * @author bcueva
 * @param {MicroFrontendProps} props Props to load micro frontend
 * @returns
 */
export const MicroFrontend = ({
  remote,
  onEvent,
  props,
  LoadingComponent,
  NotAvailableComponent,
}: MicroFrontendProps): JSX.Element => {
  const { ready, failed } = useLoadScript({
    url: remote && remote.url,
  });

  if (!remote) {
    return <strong>Not micro frontend specified</strong>;
  }

  if (failed) {
    return NotAvailableComponent ? (
      NotAvailableComponent
    ) : (
      <strong>The micro frontend: {remote.module} is not available</strong>
    );
  }

  const Loading = LoadingComponent ?? <strong>Loading Remote Micro Frontend: {remote.module}</strong>;
  if (!ready) {
    return Loading;
  }

  const Component = lazy(MfeModule.loadModule(remote.scope, remote.module));

  return (
    <Suspense fallback={Loading}>
      <Component onEvent={onEvent} props={props} />
    </Suspense>
  );
};