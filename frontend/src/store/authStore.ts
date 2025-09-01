import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
	id: string
	email: string
}

interface AuthState {
	isAuthenticated: boolean
	user: User | null
	userName: string | null
	token: string | null
	login: (user: User, userName: string, token: string) => void
	logout: () => void
}

const useAuthStore = create<AuthState>()(
	persist(
		(set) => ({
			isAuthenticated: false,
			user: null,
			userName: null,
			token: null,

			login: (user: User, userName : string, token: string) =>
				set({
					isAuthenticated: true,
					user,
					userName,
					token,
				}),

			logout: () =>
				set({
					isAuthenticated: false,
					user: null,
					userName: null,
					token: null,
				}),
		}),
		{
			name: 'auth-storage',
		}
	)
)

export default useAuthStore
