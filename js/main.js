/*global
  $, console
*/

$(function () {
  "use strict";
  
  var playing = false,
    $buttons = $('.js-buttons'),
    $playButton = $('<button />')
      .text('Play'),
    $stopButton = $('<button />')
      .text('Stop'),
    notes;
  
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
    
    function onClick(event) {
      for (i = 0, l = notesArray.length; i < l; i += 1) {
        dim(i);
      }
      
      highlight($(event.target).data('index'));
    }
    
    for (i = 0, l = notesArray.length; i < l; i += 1) {
      $note = $('<li />')
        .addClass('notes__note')
        .text(notesArray[i])
        .data('index', i)
        .click(onClick);
      
      $el.append($note);
      
      notes.push($note);
    }
    
    this.$el = $el;
    this.highlight = highlight;
    this.dim = dim;
  }
  
  notes = new Notes();
  
  $('.js-notes').append(notes.$el);
});