"use strict";
// var soundMaker = function(source) {
// 	var sound = document.createElement("audio");
// 	sound.src = source;
// 	return sound;
// }
// var kick = soundMaker("audio/drum-samples/kick.wav");


angular.module("drumMachine", [])
.controller("drumCtrl", function($interval) {
	// this.kick = getElementById("kick");
	this.soundMaker = function(source) {
		var sound = document.createElement("audio");
		sound.src = source;
		return sound;
	};
	// this.kick = this.soundMaker("audio/drum-samples/kick.wav");
	this.bpm = 120;
	this.intervalTime = this.bpm * 400 / 60; 
	this.beats = [ { playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false } ];
	this.instruments = [
		{ 
			name: "Kick",
			sound: this.soundMaker("audio/drum-samples/kick.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Snare",
			sound: this.soundMaker("audio/drum-samples/snare.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Closed Hat",
			sound: this.soundMaker("audio/drum-samples/hatClosed.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Open Hat",
			sound: this.soundMaker("audio/drum-samples/hatOpen.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tom",
			sound: this.soundMaker("audio/drum-samples/tom.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tambourine",
			sound: this.soundMaker("audio/drum-samples/tambourine.wav"),
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
				instrument.sound.play();
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