import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}





function descendingComparator<T extends object>(a: T, b: T, orderBy: keyof T) {
  // to compare dates values must be of type Date
  if (orderBy === 'date') {
    if (new Date(b[orderBy]) < new Date(a[orderBy])) {
      return -1;
    }
    if (new Date(b[orderBy]) > new Date(a[orderBy])) {
      return 1;
    }
  }
  // no date values (amount, category)
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
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
