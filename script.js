const tracks = [
    { name: "Второй Ка - Встречайте Говнюков", src: "tracks/track1.mp3", cover: "images/cover1.jpg" },
    { name: "Второй Ка - Мы играем до конца", src: "tracks/track2.mp3", cover: "images/cover2.jpg" },
    { name: "Ayau - jaman adam?", src: "tracks/track3.mp3", cover: "images/cover3.jpg" },
    { name: "The Pretty Reckless - Make me wanna die", src: "tracks/track4.mp3", cover: "images/cover4.jpg" },
    { name: "Ninety One - Bari biled", src: "tracks/track5.mp3", cover: "images/cover5.jpg" },
    { name: "Sergey Shnurov - Свобода(feat. Кипелов)", src: "tracks/track6.mp3", cover: "images/cover6.jpg" }
];

let currentTrackIndex = 0;
let randomTrackIndex = 0;
let isPlaying = false;
const audio = new Audio(tracks[currentTrackIndex].src);

const playPauseButton = document.getElementById('play-pause');
const nextButton = document.getElementById('next');
const previousButton = document.getElementById('previous');
const trackList = document.getElementById('track-list');
const coverImage = document.getElementById('cover');
const trackName = document.getElementById('track-name');
const volumeControl = document.getElementById('volume-control');
const progressBar = document.getElementById('progress-bar');
const shuffleButton = document.getElementById('shuffle');

audio.volume = volumeControl.value;

function loadTrack(index) {
    currentTrackIndex = index;
    audio.src = tracks[index].src;
    coverImage.src = tracks[index].cover;
    trackName.textContent = tracks[index].name;
}

function shuffle(index) {
        currentTrackIndex = index;
        randomTrackIndex = Math.floor(Math.random() * currentTrackIndex) % tracks.length;
        loadTrack(randomTrackIndex);
        audio.play()

}

function playPauseTrack() {
    if (isPlaying) {
        audio.pause();
        playPauseButton.textContent = "Play";
    } else {
        audio.play();
        playPauseButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play()
}
function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentTrackIndex);
    audio.play()
}

// Обновляем максимальное значение шкалы прогресса, когда трек загружен
audio.addEventListener('loadedmetadata', () => {
    progressBar.max = audio.duration;
});

// Обновляем шкалу прогресса при воспроизведении
audio.addEventListener('timeupdate', () => {
    progressBar.value = audio.currentTime;
});

// Перематываем трек при изменении позиции ползунка
progressBar.addEventListener('input', () => {
    audio.currentTime = progressBar.value;
});

playPauseButton.addEventListener('click', playPauseTrack);
nextButton.addEventListener('click', nextTrack);
previousButton.addEventListener('click', previousTrack);
audio.addEventListener('ended', nextTrack);
shuffleButton.addEventListener('shuffle', shuffle);
volumeControl.addEventListener('input', (event) => {
    audio.volume = event.target.value;
});


trackList.addEventListener('click', (e) => {
    if (e.target && e.target.nodeName === "LI") {
        loadTrack(parseInt(e.target.getAttribute('data-track')));
        audio.play()

    }
});

// Load the initial track
loadTrack(currentTrackIndex);
