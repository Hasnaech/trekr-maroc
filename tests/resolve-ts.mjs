// Permet a node de resoudre les imports sans extension ("./network") vers les .ts du projet.
import { registerHooks } from "node:module";

registerHooks({
  resolve(specifier, context, nextResolve) {
    try {
      return nextResolve(specifier, context);
    } catch (err) {
      if (specifier.startsWith(".")) return nextResolve(`${specifier}.ts`, context);
      throw err;
    }
  },
});
