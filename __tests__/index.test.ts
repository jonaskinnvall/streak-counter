import { JSDOM } from 'jsdom'
import { streakCounter } from '../src'

describe('streakCounter', () => {
	let mockLocalStorage: Storage
	beforeEach(() => {
		const mockJSDom = new JSDOM('', { url: 'https://localhost' })
		mockLocalStorage = mockJSDom.window.localStorage
	})

	it('should return a streak object with currentCount, lastLoginDate and startDate', () => {
		const date = new Date()
		const streak = streakCounter(mockLocalStorage, date)

		expect(streak.hasOwnProperty('currentCount')).toBe(true)
		expect(streak.hasOwnProperty('lastLoginDate')).toBe(true)
		expect(streak.hasOwnProperty('startDate')).toBe(true)
	})
})
