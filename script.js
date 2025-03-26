const songs = [
    "SONGS/02_Bol Naa Halke Halke.mp3",
    "SONGS/03_Abhi Mujh Mein Kahin.mp3",
    "SONGS/04_Bhagwan Hai Kahan Re Tu.mp3",
    "SONGS/05_Saathiya Tune Kya Kiya.mp3",
    "SONGS/06_Bahara.mp3",
    "SONGS/07_Banjaara.mp3",
    "SONGS/08_Surili Akhiyon Wale.mp3",
    "SONGS/09_Saibo.mp3",
    "SONGS/10_Manwa Laage.mp3"
];

const songTitles = [
    "Bol Naa Halke Halke",
    "Abhi Mujh Mein Kahin",
    "Bhagwan Hai Kahan Re Tu",
    "Saathiya Tune Kya Kiya",
    "Bahara",
    "Banjaara",
    "Surili Akhiyon Wale",
    "Saibo",
    "Manwa Laage"
];

let currentSongIndex = 0; // Now it starts from the second song
const audio = document.getElementById("audio-player");
const playPauseButton = document.getElementById("play-pause");
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const seekBar = document.getElementById("seek-bar");
const songTitle = document.getElementById("song-title");
const playlist = document.getElementById("playlist");

// Load Playlist
songs.forEach((song, index) => {
    const li = document.createElement("li");
    li.textContent = songTitles[index];
    li.addEventListener("click", () => playSong(index));
    playlist.appendChild(li);
});

// Play/Pause Function
function togglePlayPause() {
    if (audio.paused) {
        audio.play();
        playPauseButton.textContent = "⏸";
    } else {
        audio.pause();
        playPauseButton.textContent = "▶";
    }
}

// Play Specific Song
function playSong(index) {
    currentSongIndex = index;
    audio.src = songs[currentSongIndex];
    songTitle.textContent = songTitles[currentSongIndex];
    audio.play();
    playPauseButton.textContent = "⏸";
}

// Next & Previous
function playNext() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(currentSongIndex);
}

function playPrev() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(currentSongIndex);
}

// Seek Bar
audio.addEventListener("timeupdate", () => {
    seekBar.max = audio.duration;
    seekBar.value = audio.currentTime;
});

seekBar.addEventListener("input", () => {
    audio.currentTime = seekBar.value;
});

// Event Listeners
playPauseButton.addEventListener("click", togglePlayPause);
nextButton.addEventListener("click", playNext);
prevButton.addEventListener("click", playPrev);

// Auto Play Next Song
audio.addEventListener("ended", playNext);

// Auto Load First Song (from the second song in the list)
playSong(0);
