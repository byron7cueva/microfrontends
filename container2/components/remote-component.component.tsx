import { Suspense, lazy } from "react";

import { MfeRemote } from "./types";
import { useLoadScript } from "./hooks";
import { MfeModule } from "./utils";


/**
 * Props for Remote component
 *
 * @interface RemoteComponentProps
 * @extends {MfeLoading}
 */
interface RemoteComponentProps extends Record<string, any> {
  remote: MfeRemote;
}

/**
 * Remote Component
 *
 * @version 1.1.0
 * @author bcueva
 * @param {RemoteComponentProps} props Props to load micro frontend
 * @returns
 */
export const RemoteComponent = (props: RemoteComponentProps ): JSX.Element => {
  const { remote , NotAvailableComponent, LoadingComponent } = props;
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
      <Component {...props} />
    </Suspense>
  );
};