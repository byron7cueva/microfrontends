/**
 * Props to define micro frontend
 *
 * @author bcueva
 * @export
 * @interface MfeProps
 * @template P
 * @template E
 */
export interface MfeProps {
  LoadingComponent?: JSX.Element;
  NotAvailableComponent?: JSX.Element;
}


/**
 * Remote configuration
 *
 * @export
 * @interface MfeRemote
 */
export interface MfeRemote {
  url: string;
  scope: string;
  module: string;
}