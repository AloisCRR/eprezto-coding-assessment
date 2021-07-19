import { useMemo } from "react";
import { createStore, Store, Reducer, PreloadedState } from "redux";

export const baseState = {
  insurancePolicies: {
    id: "",
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
    rating: "",
  },
  maxLesionesCorporales: 0,
  maxDanosPropiedad: 0,
  maxGastosMedicos: 0,
};

export type initialState = {
  insurancePolicies: typeof baseState.insurancePolicies[];
  maxLesionesCorporales: number;
  maxDanosPropiedad: number;
  maxGastosMedicos: number;
};

const optionalBaseState = {
  insurancePolicies: [baseState.insurancePolicies],
  maxDanosPropiedad: 0,
  maxGastosMedicos: 0,
  maxLesionesCorporales: 0,
};

type AddInsurancePoliciesAction = {
  type: "ADD_INSURANCE_POLICIES";
  insurancePolicies: typeof baseState.insurancePolicies[];
};

type AddMaxDanosPropiedad = {
  type: "ADD_MAX_DANOS_PROPIEDAD";
  maxDanosPropiedad: number;
};

type AddMaxGastosMedicos = {
  type: "ADD_MAX_GASTOS_MEDICOS";
  maxGastosMedicos: number;
};

type AddMaxLesionesCorporales = {
  type: "ADD_MAX_LESIONES_CORPORALES";
  maxLesionesCorporales: number;
};

export type Actions =
  | AddInsurancePoliciesAction
  | AddMaxDanosPropiedad
  | AddMaxGastosMedicos
  | AddMaxLesionesCorporales;

let store: Store<initialState, Actions> | undefined;

const reducer: Reducer<initialState, Actions> = (
  state: initialState = optionalBaseState,
  action
) => {
  switch (action.type) {
    case "ADD_INSURANCE_POLICIES":
      return {
        ...state,
        insurancePolicies: action.insurancePolicies,
      };
    case "ADD_MAX_DANOS_PROPIEDAD":
      return {
        ...state,
        maxDanosPropiedad: action.maxDanosPropiedad,
      };
    case "ADD_MAX_GASTOS_MEDICOS":
      return {
        ...state,
        maxGastosMedicos: action.maxGastosMedicos,
      };
    case "ADD_MAX_LESIONES_CORPORALES":
      return {
        ...state,
        maxLesionesCorporales: action.maxLesionesCorporales,
      };
    default:
      return state;
  }
};

function initStore(
  preloadedState: PreloadedState<initialState> = optionalBaseState
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
