import createElement from "./helpers/createElement";

export default function Viewer() {
  const $el = createElement('div', 'notes-viewer');
  Object.assign($el.style, {
    padding: '10px'
  });

  const note = createElement('span', 'notes-viewer__note');
  note.innerText = 'A';

  Object.assign(note.style, {
    border: '1px solid black',
    borderRadius: '100%',
    padding: '5px 10px',
    display: 'inline-block'
  });

  $el.appendChild(note);

  return {
    $el,
    highLight: () => {
      note.style.backgroundColor = 'green';
    },
    dim: () => {},
    dimAll: () => {
      note.style.backgroundColor = 'transparent';
    }
  }
}


