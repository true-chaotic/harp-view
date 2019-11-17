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
      sounds: [
        {name: NOTES.SNAP, volume: 1.0},
        {name: NOTES.A, volume: 0.3}
      ],
      path: "sounds/",
      preload: true,
      multiplay: true
    });

    return {
      playNote: (note) => {
        console.log(note);

        ion.sound.play(NOTES.A);
      },
      playSnap: () => {
        console.log('snap');

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
