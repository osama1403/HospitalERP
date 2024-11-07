import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





function descendingComparator<T extends object>(a: T, b: T, orderBy: keyof T) {
  const aValue:any = a[orderBy];
  const bValue:any = b[orderBy];

  // Check if the values are dates and perform date comparison
  if (orderBy === 'date' && aValue instanceof Date && bValue instanceof Date) {
    if (bValue < aValue) {
      return -1;
    }
    if (bValue > aValue) {
      return 1;
    }
  }

  // General comparison for other types
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
    return 1;
  }

  return 0;
}

type comparatorResule = 1 | -1 | 0
type order = 'desc' | 'asc'

export function getComparator<T extends object>(order: order, orderBy: keyof T) {
  return order === 'desc'
    ? (a: T, b: T) => (descendingComparator(a, b, orderBy) as comparatorResule)
    : (a: T, b: T) => (-descendingComparator(a, b, orderBy) as comparatorResule)
}
