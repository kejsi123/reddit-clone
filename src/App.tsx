import './App.css';
import { ThemeProvider } from './components/themeProvider';

function App() {
	return (
		<ThemeProvider
			defaultTheme='dark'
			storageKey='vite-ui-theme'>
			<div>Hello</div>
		</ThemeProvider>
	);
}

export default App;
