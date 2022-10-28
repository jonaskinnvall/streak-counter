import { formattedDate } from './utils'

interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

export function streakCounter(storage: Storage, date: Date): Streak {
	return {
		currentCount: 1,
		lastLoginDate: formattedDate(date),
		startDate: formattedDate(date),
	}
}
