import utils from './utils.js';
import './styles/style.css';

if (ENV.indexOf('development') === 0) {
  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  );
}

utils();