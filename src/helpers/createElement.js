/**
 * Creates element with class and listeners
 *
 * @param {string} name
 * @param {string|array} [classes=[]]
 * @param {object} [listeners={}]
 * @returns {Element}
 */
export default function createElement(name, classes = [], listeners = {}) {
  const element = document.createElement(name);
  const classesArray = typeof classes === 'string'
    ? [classes]
    : classes;

  element.classList.add(...classesArray);

  Object.keys(listeners).forEach(event => {
    element.addEventListener(event, listeners[event]);
  });

  return element;
}
