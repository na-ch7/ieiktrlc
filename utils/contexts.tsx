import { createContext } from "react";
import { Config, Home, Members } from "./types";

export const ConfigContext = createContext<Config | undefined>(undefined);
export const HomeContext = createContext<Home | undefined>(undefined);
