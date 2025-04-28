import './styles/main.module.scss';
import './styles/tailwind.css';


import { App } from './App';

document.addEventListener('DOMContentLoaded', () => {
  const app = new App('root');
  app.init();
});
