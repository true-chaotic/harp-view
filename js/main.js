/*global
  $, console
*/

$(function () {
  "use strict";
  
  var playing = false,
    bpm = 80,
    bpms = [bpm / 2, bpm, bpm * 1.5],
    $buttons = $('.js-buttons'),
    $playButton = $('<button />')
      .text('Play'),
    $stopButton = $('<button />')
      .text('Stop'),
    notes,
    speed;
  
  $buttons
    .append($playButton)
    .append($stopButton);
  
  function updateButtons() {
    $playButton.toggle(!playing);
    $stopButton.toggle(playing);
  }
  
  function togglePlay(newPlaying) {
    playing = newPlaying;
    
    updateButtons();
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
      notesString = 'ABCDEFGabcdefg',
      notesArray = notesString.split(''),
      i,
      l,
      $note,
      noteLitClass = 'notes__note_lit';
    
    function highlight(index) {
      notes[index].addClass(noteLitClass);
    }
    
    function dim(index) {
      notes[index].removeClass(noteLitClass);
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
  }
  
  notes = new Notes();
  speed = new Speed();
  
  $('.js-notes').append(notes.$el);
  $('.js-speed').append(speed.$el);
});