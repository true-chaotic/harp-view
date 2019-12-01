import './vendor/ion.sound';

const NOTES = {
  SNAP: 'snap',
  A: 'bell_ring'
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
