export const KEY = 'streak'

export interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

export function formattedDate(date: Date): string {
	// return date without timestamp
	return date.toLocaleDateString('en-US')
}

export function buildStreak(date: Date, overrideDefaults?: Partial<Streak>) {
	const defaultStreak = {
		currentCount: 1,
		startDate: formattedDate(date),
		lastLoginDate: formattedDate(date),
	}
	return { ...defaultStreak, ...overrideDefaults }
}

export function updateStreak(storage: Storage, streak: Streak) {
	storage.setItem(KEY, JSON.stringify(streak))
}
