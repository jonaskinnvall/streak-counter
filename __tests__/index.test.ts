import { streakCounter } from '../src'

describe('streakCounter', () => {
	it('should return a streak object with currentCount, lastLoginDate and startDate', () => {
		const mockLocalStorage = ''
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		expect(streak.hasOwnProperty('currentCount')).toBe(true)
		expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
		expect(streak.hasOwnProperty('startDate')).toBe(true)
	})
})
