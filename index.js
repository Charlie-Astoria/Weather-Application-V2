import { registerRootComponent } from 'expo';
import App from './App';

// Ensure native platforms use AppRegistry via Expo helper:
registerRootComponent(App);

// Also export App as default so environments that expect a default export
// from index.js (such as some web/Expo Go setups) can render it directly.
export default App;
