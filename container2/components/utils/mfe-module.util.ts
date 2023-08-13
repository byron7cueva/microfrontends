export abstract class MfeModule {
    /**
     * Function lo load component
     *
     * @static
     * @param {any} scope Scope
     * @param {string} module Module name
     * @return {any} Module
     * @memberof MfeModule
     */
    static loadModule(scope: any, module: string): any {
      return async () => {
        // Initializes the share scope. This fills it with known provided modules from this build and all remotes
        // @ts-ignore
        await __webpack_init_sharing__("default");
        const container = window[scope]; // or get the container somewhere else
        // Initialize the container, it may provide shared modules
        try {
          // @ts-ignore
          await container.init(__webpack_share_scopes__.default);
        } catch (e) {
          throw new Error(`ERROR: Scope ${scope} not defined: ${e}`);
        }
        // @ts-ignore
        const factory = await window[scope].get(module);
        let Module;
        try {
          Module = factory();
        } catch (e) {
          throw new Error(
            `ERROR: A module that has the same path as "${module}": "path" has already been loaded or there are errors in the remote micro frontend \n ${e}`
          );
        }
        return Module;
      };
    }
  }
  