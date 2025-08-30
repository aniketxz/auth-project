import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import NotesPage from './pages/NotesPage'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/signup' element={<SignUp />} />
				<Route path='/signin' element={<SignIn />} />

				<Route element={<ProtectedRoute />}>
					<Route path='/' element={<NotesPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
