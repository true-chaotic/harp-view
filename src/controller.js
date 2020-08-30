import Viewer from './viewer';
import Player from './player';
import ControllerView from "./controller-view";
import abcjs from "abcjs";

const parseNote = glyph => {
  if (glyph.indexOf('[') === -1) {
    return [glyph];
  }

  const result = [];
  const glyphs = glyph.substring(1, glyph.length - 1).split('');

  let currentGlyph = glyphs.shift();
  glyphs.forEach((letter, index, array) => {
    if (/[a-zA-Z]/.test(letter)) {
      result.push(currentGlyph);
      currentGlyph = letter;
    } else {
      currentGlyph += letter;
    }

    if (index === array.length - 1) {
      result.push(currentGlyph);
    }
  });

  console.log(result);

  return result;
};

export default function Controller({tune, soundFolder}) {
  let player = new Player({soundFolder});
  const viewer = new Viewer({
    onClickNote(note) {
      player.playNote(note);
      viewer.highLight(note);

      setTimeout(() => {
        viewer.dim(note);
      }, 500);
    }
  });

  const stop = () => {
    controllerView.update({playing: false});
    timingCallbacks.stop();
    viewer.dimAll();
  };

  const visualObj = abcjs.renderAbc("*", tune);
  const timingCallbacks = new abcjs.TimingCallbacks(visualObj[0], {
    eventCallback(event) {
      if (!event) {
        return;
      }

      const {startChar, endChar} = event;

      if (![startChar, endChar].every(index => typeof index === 'number')) {
        return;
      }

      const glyph = tune.substring(startChar, endChar)
        .trim()
        .replace(/[0-9]/g, '')
        .replace(/[\/]/g, '');

      console.log(glyph);

      const notes = parseNote(glyph);

      viewer.dimAll();

      notes.forEach(note => {
        player.playNote(note);
        viewer.highLight(note);
      })
    }
  });

  const controllerView = new ControllerView({
    viewerElement: viewer.$el,

    //bpm: ticksPerMinute / ticksPerSnap,

    onClickFaster() {
      //speedStep(+1);
    },

    onClickSlower() {
      //speedStep(-1);
    },

    onPlay() {
      controllerView.update({playing: true});

      timingCallbacks.start();
    },
    onStop: stop
  });

  return controllerView.$el;
}
