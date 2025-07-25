import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { techMap } from "@/constants/techMap";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getDeviconClassName = (techName: string) => {
  const formattedName = techName.toLowerCase().replace(/ [ .]/g, '');

  return techMap[formattedName] 
    ? `${techMap[formattedName]} colored` 
    : "devicon-devicon-plain";
};
