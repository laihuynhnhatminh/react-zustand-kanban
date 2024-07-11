import { StoreMutatorIdentifier, StateCreator } from "zustand";

type Logger = <
  T,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  name?: string
) => StateCreator<T, Mps, Mcs>;

type LoggerImpl = <T>(
  f: StateCreator<T, [], []>,
  name?: string
) => StateCreator<T, [], []>;

const loggerImpl: LoggerImpl = (f, name) => (set, get, store) => {
  const loggedSet: typeof set = (...a) => {
    set(...a);
    console.log(...(name ? [`${name}:`] : []), get());
  };
  const setState = store.setState;
  store.setState = (...a) => {
    setState(...a);
    console.log(...(name ? [`${name}:`] : []), store.getState());
  };

  return f(loggedSet, get, store);
};

export default loggerImpl as Logger;
