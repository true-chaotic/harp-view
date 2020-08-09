import createElement from "../helpers/createElement";

import fs from 'fs';
const styles = fs.readFileSync(__dirname + '/notes-viewer.css', 'utf8');

const noop = () => {};

let styleAdded = false;

const addStyles = () => {
  if (styleAdded) {
    return;
  }

  const style = document.createElement('style');

  style.innerHTML = styles;

  document.head.appendChild(style);

  styleAdded = true;
};

const getNoteModifier = note => note
  .replace('\'', '-high')
  .replace(',', '-low');

const baseContainerClass = 'notes-viewer__container';
const baseNoteClass = 'notes-viewer__note';
const activeClass = `${baseNoteClass}_active`;

export default function Viewer({onClickNote = noop} = {}) {
  // const notes = "F, C, D, E, F G A B c d e f | g a b c' d' e' f' g' a' x";

  const notes = "| e c A F D B, G, E, D, C, F,, | x a g f d B G E C A, F, |";

  const $el = createElement('div', 'notes-viewer');

  addStyles();

  let $column;

  const elements = notes
    .split(' ')
    .reduce((result, note, index, arr) => {
      if (note === '|') {
        if ($column) {
          $el.appendChild($column);
        }

        if (index !== arr.length - 1) {
          $column = createElement('ul', 'notes-viewer__column');
        }
      } else {
        const noteContainer = createElement('li', [
          baseContainerClass,
          `${baseContainerClass}_${getNoteModifier(note)}`
        ]);

        const noteElement = createElement('button', baseNoteClass, {
          click() {
            onClickNote(note);
          }
        });
        noteElement.innerText = note;

        noteContainer.appendChild(noteElement);

        $column.appendChild(noteContainer);

        result[note] = noteElement;
      }

      return result;
  }, {});

  const highLighted = new Set();

  function dim(note) {
    if (elements[note]) {
      elements[note].classList.remove(activeClass);
      elements[note].blur();

      highLighted.delete(note);
    }
  }

  function highLight(note) {
    if (elements[note]) {
      elements[note].classList.add(activeClass);

      highLighted.add(note);
    }
  }

  function dimAll() {
    [...highLighted].forEach(dim);
  }

  return {
    $el,
    highLight,
    dim,
    dimAll
  }
}


