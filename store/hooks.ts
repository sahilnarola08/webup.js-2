import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store";

/**
 * Custom dispatch
 * @returns
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
/**
 * Custom selector
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
