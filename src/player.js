import './vendor/ion.sound';

const NOTES = {
  SNAP: 'snap',

  "F,,": 'F0',

  "C,": 'C1',
  "D,": 'D1',
  "E,": 'E1',
  "F,": 'F1',
  "G,": 'G1',
  "A,": 'A1',
  "B,": 'B1',

  C: 'C2',
  D: 'D2',
  E: 'E2',
  F: 'F2',
  G: 'G2',
  A: 'A2',
  B: 'B2',

  c: 'C3',
  d: 'D3',
  e: 'E3',
  f: 'F3',
  g: 'G3',
  a: 'A3',
};

const Player = (function () {
  let instance;

  function GlobalPlayer({soundFolder = 'sounds/'} = {}) {
    const ion = window.ion;

    ion.sound({
      sounds: Object.values(NOTES).map(name => ({
        name,
        volume: name === NOTES.SNAP
          ? 1.0
          : 0.3
      })),
      path: soundFolder,
      preload: true,
      multiplay: true
    });

    return {
      playNote: (note) => {
        if (NOTES[note]) {
          ion.sound.play(NOTES[note]);
        }
      },
      playSnap: () => {
        ion.sound.play(NOTES.SNAP);
      },
    }
  }

  return function({soundFolder} = {}) {
    if (!instance) {
      instance = new GlobalPlayer({soundFolder});
    }

    return instance;
  }
}());

export default Player;
