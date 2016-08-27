"use strict";

angular.module("drumMachine", [])
.controller("drumCtrl", function($interval) {
	// this.kick = getElementById("kick");
	this.soundMaker = function(source) {
		var sound = document.createElement("audio");
		sound.src = source;
		return sound;
	};
	this.songIsPlaying = false;
	this.bpm = 120; 
	this.beats = [ { playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false },
				{ playing : false , quaver: true}, { playing : false }, { playing : false }, { playing : false } ];
	this.instruments = [
		{ 
			name: "Kick",
			sound: this.soundMaker("public/audio/drum-samples/kick.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Snare",
			sound: this.soundMaker("public/audio/drum-samples/snare.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Closed Hat",
			sound: this.soundMaker("public/audio/drum-samples/hatClosed.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Open Hat",
			sound: this.soundMaker("public/audio/drum-samples/hatOpen.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tom",
			sound: this.soundMaker("public/audio/drum-samples/tom.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Clap",
			sound: this.soundMaker("public/audio/drum-samples/clap.wav"),
			notes: [{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false },
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false }, 
					{ value : false, quaver: true }, { value : false }, { value : false }, { value : false } ]
		},
		{
			name: "Tambourine",
			sound: this.soundMaker("public/audio/drum-samples/tambourine.wav"),
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
	this.playOrPause = "play.svg";
	this.playBeat = function() {
		this.instruments.forEach( instrument => {
			if (instrument.notes[this.songBeat].value) {
				instrument.sound.currentTime = 0;
				instrument.sound.play();
			};
		})
	};
	this.metronomeLight = function () {
		this.beats.forEach( beat => {
			beat.playing = false;
		})
		this.beats[this.songBeat].playing = true;
	}
	var stop;
	this.playSong = function () {
		this.songIsPlaying = true;
		stop = $interval(() => {
			this.metronomeLight();
			this.playBeat();
			this.songBeat = (this.songBeat+1) % 16;
		}, Math.pow(this.bpm, -1) * 15000) // converts beats per minute to milliseconds per 16th note;
		this.playOrPause = "pause.svg";
	};
	this.pauseSong = function () {
		$interval.cancel(stop);
		stop = undefined;
		this.songIsPlaying = false;
		this.playOrPause = "play.svg";
	}
	this.toggleSong = function() {
		if (this.songIsPlaying) {
			this.pauseSong();
		} else {
			this.playSong();
		}
	};
	this.stopSong = function() {
		$interval.cancel(stop);
		stop = undefined;
		this.songIsPlaying = false;
		this.beats.forEach( beat => {
			beat.playing = false;
		})
		this.songBeat = 0;
		this.playOrPause = "play.svg";
	}
});