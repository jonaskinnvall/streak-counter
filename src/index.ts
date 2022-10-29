import { formattedDate } from './utils'

interface Streak {
	currentCount: number
	lastLoginDate: string
	startDate: string
}

const KEY = 'streak'

export function streakCounter(storage: Storage, date: Date): Streak {
	const streakInLocalStorage = storage.getItem(KEY)
	if (streakInLocalStorage) {
		try {
			const streak = JSON.parse(streakInLocalStorage)
			const state = 'increment'
			const SHOULD_INCREMENT = state === 'increment'

			if (SHOULD_INCREMENT) {
				const updatedStreak = {
					...streak,
					currentCount: streak.currentCount + 1,
					lastLoginDate: formattedDate(date),
				}
				console.log(updatedStreak)

				return updatedStreak
			}
			return streak
		} catch (error) {
			console.error('Failed to parse streak from localStorage')
		}
	}

	const streak = {
		currentCount: 1,
		lastLoginDate: formattedDate(date),
		startDate: formattedDate(date),
	}

	storage.setItem(KEY, JSON.stringify(streak))

	return streak
}
