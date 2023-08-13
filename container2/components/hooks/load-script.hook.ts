import { useState, useEffect } from 'react';

import { Script } from '../types';

/**
 * Load dynamic script
 * 
 * @author bcueva
 * @param options 
 * @returns 
 */
export function useLoadScript(options: Script) {
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!options.url) {
      return;
    }

    const element = document.createElement("script");

    element.src = options.url;
    element.type = "text/javascript";
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${options.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${options.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${options.url}`);
      document.head.removeChild(element);
    };
  }, [options.url]);

  return {
    ready,
    failed
  };
};