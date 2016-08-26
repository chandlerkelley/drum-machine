"use strict";

// var kick = getElementById("kick");


angular.module("drumMachine", [])
.controller("drumCtrl", function($interval) {
	this.kick = getElementById("kick");
	this.bpm = 120;
	this.intervalTime = this.bpm * 400 / 60; 
	this.beats = [ { playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false } ];
	this.instruments = [
		{ 
			name: "Kick",
			sound: this.kick,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Snare",
			// sound: $snare,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Closed Hat",
			// sound: $hatClosed,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Open Hat",
			// sound: $hatOpen,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tom",
			// sound: $tom,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tambourine",
			// sound: $tambourine,
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		}
	];
	this.noteOn = function(note) {
		note.value = note.value === false ? true : false;
	}
	this.songBeat = 0;
	this.playBeat = function() {
		this.instruments.forEach( instrument => {
			if (instrument.notes[this.songBeat].value) {
				console.log(instrument.name + "plays note!");
				instrument.sound.Play();
			};
		})
	};
	this.playSong = function() {
		$interval(() => {
			console.log("Click");
			this.playBeat();
			this.songBeat = (this.songBeat+1) % 8;
		}, this.intervalTime)
	};
});