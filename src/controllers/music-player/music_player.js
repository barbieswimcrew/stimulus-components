'use strict';

import {Controller} from '@hotwired/stimulus';

export default class extends Controller {

    static classes = [
        'hidden'
    ];

    static targets = [
        'artist',
        'artwork',
        'audio',
        'currentTime',
        'duration',
        'muteIcon',
        'unmuteIcon',
        'playIcon',
        'pauseIcon',
        'progress',
        'repeatIcon',
        'repeatOffIcon',
        'title',
        'volume'
    ];

    static values = {
        index: {
            type: Number,
            default: 0
        },
        tracks: {
            type: Array,
            default: []
        }
    };

    playPause() {
        (this.audioTarget.paused) ? this.audioTarget.play() : this.audioTarget.pause();
    }

    prev() {
        this.indexValue = (this.indexValue > 0) ? this.indexValue - 1 : (this.tracksValue.length - 1);
    }

    mute() {
        this.audioTarget.muted = !this.audioTarget.muted;
        this.#toggleIcon(this.muteIconTarget, this.unmuteIconTarget, true);
    }

    next() {
        this.indexValue = (this.indexValue < (this.tracksValue.length - 1)) ? this.indexValue + 1 : 0;
    }

    repeat() {
        this.audioTarget.loop = !this.audioTarget.loop;
        this.#toggleIcon(this.repeatIconTarget, this.repeatOffIconTarget, true);
    }

    audioTargetConnected(element) {
        if (!(element instanceof HTMLAudioElement)) {
            throw TypeError('Target "audio" must be of type ' + HTMLAudioElement.name);
        }

        this.audioTarget.addEventListener('loadedmetadata', () => {
            this.durationTarget.innerHTML = this.#formatTime(this.audioTarget.duration);
            this.progressTarget.max = Math.floor(this.audioTarget.duration);
        });

        this.audioTarget.addEventListener('timeupdate', () => {
            this.currentTimeTarget.innerHTML = this.#formatTime(this.audioTarget.currentTime);
            this.progressTarget.value = Math.floor(this.audioTarget.currentTime);
        });

        this.audioTarget.addEventListener('play', () => {
            this.#toggleIcon(this.pauseIconTarget, this.playIconTarget);
        });

        this.audioTarget.addEventListener('pause', () => {
            this.#toggleIcon(this.playIconTarget, this.pauseIconTarget);
        });

        this.audioTarget.addEventListener('emptied', () => {
            this.#toggleIcon(this.playIconTarget, this.pauseIconTarget);
        });

        this.audioTarget.addEventListener('ended', () => {
            this.#toggleIcon(this.playIconTarget, this.pauseIconTarget);
        });
    }

    progressTargetConnected() {
        this.progressTarget.addEventListener('input', () => {
            this.audioTarget.currentTime = this.progressTarget.value;
        });
    }

    volumeTargetConnected() {
        this.volumeTarget.addEventListener('input', () => {
            this.audioTarget.volume = this.volumeTarget.value / 100;
        });
    }

    indexValueChanged(index) {

        const keepPlaying = !this.audioTarget.paused;

        this.artistTarget.innerHTML = this.tracksValue[index].artist;
        this.artworkTarget.src = this.tracksValue[index].imgSrc;
        this.audioTarget.src = this.tracksValue[index].src;
        this.titleTarget.innerHTML = this.tracksValue[index].title;

        //  if the music player is currently playing,
        //  continue playing after changing the audio src
        if (keepPlaying) {
            this.audioTarget.play();
        }
    }

    #formatTime(seconds) {
        let min = Math.floor(seconds / 60);
        let sec = Math.floor(seconds % 60);

        if (sec < 10) {
            sec = `0${sec}`;
        }
        return `${min}:${sec}`;
    }

    #toggleIcon(icon1, icon2, realToggle = false) {
        if (realToggle) {
            icon1.classList.toggle(this.hiddenClass);
            icon2.classList.toggle(this.hiddenClass);
        } else {
            icon1.classList.remove(this.hiddenClass);
            icon2.classList.add(this.hiddenClass);
        }
    }
}
