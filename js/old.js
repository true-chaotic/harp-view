/*global
  $, console, ion
*/

$(function () {
  "use strict";

  var playing = false,
    minute = 1000 * 60,
    format = '4/4',
    notesInBeat = format.split('/')[0],
    bpm = 120,
    bpms = [bpm / 2, bpm, bpm * 1.5],
    $buttons = $('.js-buttons'),
    $playButton = $('<button />')
      .text('Play'),
    $stopButton = $('<button />')
      .text('Stop'),
    notes,
    speed,
    notesString = 'A',
    notesArray = notesString.split(''),
    tune = 'AAAzAAA',
    tuneArray = tune.split(),
    tuneIndex = -1,
    tuneTimeout;

  $buttons
    .append($playButton)
    .append($stopButton);

  ion.sound({
    sounds: [
      {name: "snap"},
      {name: "bell_ring"}
    ],
    path: "sounds/",
    preload: true,
    volume: 1.0,
    multiplay: true
  });

  function updateButtons() {
    $playButton.toggle(!playing);
    $stopButton.toggle(playing);
  }

  function playNote(note) {
    var index = notesArray.indexOf(note);

    notes.dimAll();
    notes.highlight(index);
    ion.sound.play("bell_ring");
  }

  function stopTune() {
    clearTimeout(tuneTimeout);

    playing = false;

    updateButtons();
  }

  function nextNote() {
    tuneTimeout = setTimeout(function () {
      var note;

      tuneIndex += 1;

      note = tune.charAt(tuneIndex);

      if (note) {
        playNote(note);

        nextNote();
      } else {
        stopTune();
      }
    }, Math.round(minute / bpm));
  }

  function startTune() {
    updateButtons();

    tuneIndex = -1;

    nextNote();
  }

  function togglePlay(newPlaying) {
    playing = newPlaying;

    if (playing) {
      startTune();
    } else {
      stopTune();
    }
  }

  $playButton.click(function () {
    togglePlay(true);
  });

  $stopButton.click(function () {
    togglePlay(false);
  });

  togglePlay(false);

  function Speed() {
    var $el = $('<div />').addClass('speed'),
      $select = $('<select />'),
      $option,
      i,
      l,
      current;

    $el.append($select);

    for (i = 0, l = bpms.length; i < l; i += 1) {
      current = bpms[i];

      $option = $('<option>')
        .attr('value', current)
        .attr('selected', current === bpm)
        .text(current);

      $select.append($option);
    }

    $select.change(function () {
      bpm = Number($(this).val());
    });

    this.$el = $el;
  }

  function Notes() {
    var $el = $('<ul />').addClass('notes'),
      notes = [],
      i,
      l,
      $note,
      noteLitClass = 'notes__note_lit';

    function highlight(index) {
      if (notes[index]) {
        notes[index].addClass(noteLitClass);
      }
    }

    function dim(index) {
      if (notes[index]) {
        notes[index].removeClass(noteLitClass);
      }
    }

    function dimAll() {
      for (i = 0, l = notesArray.length; i < l; i += 1) {
        dim(i);
      }
    }

    for (i = 0, l = notesArray.length; i < l; i += 1) {
      $note = $('<li />')
        .addClass('notes__note')
        .text(notesArray[i]);

      $el.append($note);

      notes.push($note);
    }

    this.$el = $el;
    this.highlight = highlight;
    this.dim = dim;
    this.dimAll = dimAll;
  }

  notes = new Notes();
  speed = new Speed();

  $('.js-notes').append(notes.$el);
  $('.js-speed').append(speed.$el);
});
