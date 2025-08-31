import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
	id: string
	email: string
}

interface AuthState {
	isAuthenticated: boolean
	user: User | null
	token: string | null
	login: (user: User, token: string) => void
	logout: () => void
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			token: null,

			login: (user: User, token: string) =>
				set({
					isAuthenticated: true,
					user,
					token,
				}),

			logout: () =>
				set({
					isAuthenticated: false,
					user: null,
					token: null,
				}),
		}),
		{
			name: 'auth-storage',
		}
	)
)

export default useAuthStore
