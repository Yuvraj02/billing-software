import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type {Dispatch,GetState} from "./store"


export const useAppDispatch : () => Dispatch = useDispatch
export const useAppSelector : TypedUseSelectorHook<GetState> = useSelector