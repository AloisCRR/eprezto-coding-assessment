import { useMemo } from "react";
import { createStore, Store, Reducer, PreloadedState } from "redux";

export const baseState = {
  insurancePolicies: {
    companyName: "",
    monthlyPrice: "",
    price: "",
    coverage: {
      lesiones_corporales: {
        persona: 0,
        accidente: 0,
      },
      danos_propiedad: { persona: 0, accidente: 0 },
      gastos_medicos: { persona: 0, accidente: 0 },
    },
  },
};

export type initialState = {
  insurancePolicies: typeof baseState.insurancePolicies[];
};

type AddInsurancePoliciesAction = initialState & {
  type: "ADD_INSURANCE_POLICIES";
};

export type Actions = AddInsurancePoliciesAction;

let store: Store<initialState, Actions> | undefined;

const reducer: Reducer<initialState, Actions> = (
  state: initialState = { insurancePolicies: [baseState.insurancePolicies] },
  action
) => {
  switch (action.type) {
    case "ADD_INSURANCE_POLICIES":
      return {
        ...state,
        insurancePolicies: action.insurancePolicies,
      };
    default:
      return state;
  }
};

function initStore(
  preloadedState: PreloadedState<initialState> = {
    insurancePolicies: [baseState.insurancePolicies],
  }
): typeof store {
  return createStore(reducer, preloadedState);
}

export const initializeStore = (
  preloadedState: PreloadedState<initialState>
) => {
  let _store = store ?? initStore(preloadedState);

  if (preloadedState && store) {
    _store = initStore({
      ...store.getState(),
      ...preloadedState,
    });

    store = undefined;
  }

  // SSG
  if (typeof window === "undefined") return _store;

  // Client
  if (!store) store = _store;

  return _store;
};

export function useStore(state: initialState) {
  const store = useMemo(() => initializeStore(state), [state]);
  return store;
}
