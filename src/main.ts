import { createSSRApp } from 'vue';
import App from './App.vue';
import store from '@/store';
import '@/static/css/iconfont.css';
import '@/static/css/fontfamily.scss';

export function createApp() {
	const app = createSSRApp(App);
	app.use(store);
	return {
		app
	};
}
