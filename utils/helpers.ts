export function asyncErrorWrapper(fn: Function, erroHandlerFunc: Function) {
  return new Proxy(fn, {
    async apply(target, thisArg, args) {
      try {
        return await Reflect.apply(target, thisArg, args);
      } catch (err) {
        erroHandlerFunc(err);
      }
    },
  });
}
