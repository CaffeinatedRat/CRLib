/// <reference path="math.js">

/**
* Copyright (c) 2012-2013, Ken Anderson <caffeinatedrat at gmail dot com>
* All rights reserved.
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
*     * Redistributions of source code must retain the above copyright
*       notice, this list of conditions and the following disclaimer.
*     * Redistributions in binary form must reproduce the above copyright
*       notice, this list of conditions and the following disclaimer in the
*       documentation and/or other materials provided with the distribution.
*
* THIS SOFTWARE IS PROVIDED ``AS IS'' AND ANY
* EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
* WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
* DISCLAIMED. IN NO EVENT SHALL THE AUTHOR AND CONTRIBUTORS BE LIABLE FOR ANY
* DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
* (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
* LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
* ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
* (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
* SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

"use strict";

CaffeinatedRat.Audio = CaffeinatedRat.Audio || {};

//-------------------------------------------------------------
// AudioManager
//-------------------------------------------------------------

CaffeinatedRat.Audio.AudioElement = function(source, loop) {

    /// <summary></summary>
    /// <param name="source" type="String">The audio file path and name.</param>
    /// <param name="loop" type="Boolean">Initializes the audio object to loop when played.</param>
    this.isLoop = (loop === undefined) ? false : loop;
    this.audio = null;
    this.load(source);

}

CaffeinatedRat.Audio.AudioElement.prototype = {

    loop: function (loop) {

        /// <summary>Enables or disables the playback loop.</summary>
        /// <param name="source" type="String">The audio file path and name.</param>
        /// <param name="loop" type="Boolean">Loops the audio file if true.</param>
        this.isLoop = loop;

    },

    load: function (source) {

        /// <summary>Lazy loads an audio file.  If an audio file is loaded then this method does nothing.</summary>
        /// <param name="source" type="String">The audio file path and name.</param>

        if (this.audio) return;

        //Load the audio file into memory.
        if (!(source === undefined)) {
            this.source = source;
            this.audio = window.Audio && new Audio(source);
        }
        else {
            this.audio = null;
            this.source = null;
        }

    },

    play: function () {

        /// <summary>Plays the loaded audio object.</summary>
        if (this.audio) {
            this.audio.loop = this.isLoop;
            this.audio.play();
        }

    },

    pause: function () {

        /// <summary>Pauses the loaded audio object.</summary>
        this.audio && this.audio.pause();

    },

    stop: function () {

        /// <summary>Stops playback of the loaded audio object.</summary>
        if (this.audio) {
            this.audio.pause();
            try { this.audio.currentTime = 0; } catch (err) { }
        }

    }

};

//-------------------------------------------------------------
// AudioManager
//-------------------------------------------------------------
CaffeinatedRat.Audio.AudioManager = function() {

    this.playlist = new Array();
    this.currentIndex = 0;

}

CaffeinatedRat.Audio.AudioManager.prototype = {

    addToPlaylist: function (source) {

        this.playlist.push(new CaffeinatedRat.Audio.AudioElement(source));

    },

    loop: function (loop) {

        this.playlist[this.currentIndex] = loop;

    },

    play: function (index, loop) {

        if (this.playlist.length > 0) {

            if (index === undefined) index = this.currentIndex;

            if (this.currentIndex != index) {
                this.playlist[this.currentIndex].stop();

                this.currentIndex = index % this.playlist.length;

                this.playlist[this.currentIndex].loop((loop === undefined) ? false : loop);
            }

            this.playlist[this.currentIndex] && this.playlist[this.currentIndex].play();
        }

    },

    pause: function () {

        this.playlist[this.currentIndex] && this.playlist[this.currentIndex].pause();

    },

    stop: function () {

        this.playlist[this.currentIndex] && this.playlist[this.currentIndex].stop();

    },

    next: function () {

        this.currentIndex = (++this.currentIndex % this.playlist.length);

    },

    previous: function () {

        this.currentIndex = (--this.currentIndex % this.playlist.length);

    }
};