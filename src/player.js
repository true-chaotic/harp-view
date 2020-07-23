import './vendor/ion.sound';

const NOTES = {
  SNAP: 'snap',
  K: 'bell_ring',
  "F,": 'bell_ring',
  "C,": 'bell_ring',
  "D,": 'bell_ring',
  "E,": 'bell_ring',
  A: 'bell_ring',
  B: 'bell_ring',
  C: 'bell_ring',
  D: 'bell_ring',
  E: 'bell_ring',
  F: 'bell_ring',
  G: 'bell_ring',
  c: 'bell_ring',
  d: 'bell_ring',
  e: 'bell_ring',
  f: 'bell_ring',
  g: 'bell_ring',
  b: 'bell_ring',
  "c'": 'bell_ring',
  "d'": 'bell_ring',
  "e'": 'bell_ring',
  "f'": 'bell_ring',
  "g'": 'bell_ring',
  "a'": 'bell_ring',
};

const Player = (function () {
  let instance;

  function GlobalPlayer() {
    const ion = window.ion;

    ion.sound({
      sounds: Object.values(NOTES).map(name => ({
        name,
        volume: name === NOTES.SNAP
          ? 1.0
          : 0.3
      })),
      path: "sounds/",
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

  return function() {
    if (!instance) {
      instance = new GlobalPlayer();
    }

    return instance;
  }
}());

export default Player;
