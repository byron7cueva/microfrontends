import { injectScript } from "@module-federation/nextjs-mf/utils";
import { WebpackRemoteContainer } from '@module-federation/utilities';
import { Suspense, lazy } from 'react';

import { MfeRemote, MfeProps } from "./types";

/**
 * Props for Micro Frontend component
 */
interface NextMicroFrontendProps
  extends MfeProps, Record<string, any> {
  remote: MfeRemote;
}

const isServer = typeof window === "undefined";


/**
 * Micro Frontend loader
 *
 * @version 1.0.0
 * @author bcueva
 * @param {NextMicroFrontendProps} props Props to load micro frontend
 * @returns
 */
export const NextMicroFrontend = ({
  remote,
  LoadingComponent,
  NotAvailableComponent,
  ...props
}: NextMicroFrontendProps): JSX.Element => {
  const dynamicContainer = injectScript({
    global: remote.scope,
    url: `${remote.url}/_next/static/${
      isServer ? "ssr" : "chunks"
    }/remoteEntry.js`,
  }).then((remoteContainer: WebpackRemoteContainer) => {
    if (remoteContainer.fake === true) throw new Error(`The microfrontend ${remote.url} is offline`);
    if (remoteContainer.get === undefined) throw new Error(`The scope ${remote.scope} is not defined`);
    return remoteContainer.get(remote.module)
  }).then((factory) => {
    try {
      return factory();
    } catch(e) {
      throw e;
    }
  })
  .catch((e) => {
    console.error(e);
    const ErrorComponent = NotAvailableComponent || <p>The micro frontend: {remote.module} is not available</p>;
    return { default: () => ErrorComponent};
  });

  const Loading = LoadingComponent ?? <strong>Loading Remote Micro Frontend: {remote.module}</strong>;

  const DynamicComponent = lazy(() => dynamicContainer);

  return (
      <Suspense fallback={Loading}>
        <DynamicComponent {...props} />
      </Suspense>
  );
};
