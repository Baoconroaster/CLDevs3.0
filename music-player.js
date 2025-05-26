
class MusicPlayer {
  constructor() {
    this.songs = [
      {
        title: 'fluxxwave (slowed + reverb)',
        artist: 'clovis reyes',
        url: './Song1.mp3' // Replace with actual song URL
      },
      {
        title: 'Mice On Venus but make it *E X T R A* nostalgic',
        artist: 'C418 (Remix)',
        url: './Song2.mp3' // Replace with actual song URL
      },
      {
        title: 'Resonance',
        artist: 'HOME',
        url: './Song3.mp3' // Replace with actual song URL
      }
    ];
    
    this.currentSongIndex = Math.floor(Math.random() * this.songs.length);
    this.isPlaying = false;
    this.isMuted = false;
    this.volume = 0.3;
    
    this.init();
  }
  
  init() {
    this.createPlayer();
    this.bindEvents();
    this.loadSong();
    
    // Show player after page loads
    setTimeout(() => {
      document.getElementById('music-player').classList.add('visible');
    }, 1000);
  }
  
  createPlayer() {
    const playerHTML = `
      <div id="music-player" class="music-player">
        <audio id="audio-element"></audio>
        
        <div class="song-info">
          <h3 id="song-title"></h3>
          <p id="song-artist"></p>
        </div>
        
        <div class="player-controls">
          <button id="prev-btn" class="control-btn">⏮</button>
          <button id="play-btn" class="play-btn">▶</button>
          <button id="next-btn" class="control-btn">⏭</button>
        </div>
        
        <div class="volume-controls">
          <button id="mute-btn" class="volume-btn">🔊</button>
          <input type="range" id="volume-slider" min="0" max="1" step="0.1" value="0.3">
        </div>
        
        <div class="song-selector">
          <select id="song-select"></select>
        </div>
        
        <button id="close-player" class="close-btn">×</button>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', playerHTML);
  }
  
  bindEvents() {
    const audio = document.getElementById('audio-element');
    const playBtn = document.getElementById('play-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const muteBtn = document.getElementById('mute-btn');
    const volumeSlider = document.getElementById('volume-slider');
    const songSelect = document.getElementById('song-select');
    const closeBtn = document.getElementById('close-player');
    
    playBtn.addEventListener('click', () => this.togglePlay());
    prevBtn.addEventListener('click', () => this.prevSong());
    nextBtn.addEventListener('click', () => this.nextSong());
    muteBtn.addEventListener('click', () => this.toggleMute());
    volumeSlider.addEventListener('input', (e) => this.setVolume(e.target.value));
    songSelect.addEventListener('change', (e) => this.changeSong(e.target.value));
    closeBtn.addEventListener('click', () => this.hidePlayer());
    
    audio.addEventListener('ended', () => this.nextSong());
    audio.addEventListener('play', () => this.updatePlayButton(true));
    audio.addEventListener('pause', () => this.updatePlayButton(false));
  }
  
  loadSong() {
    const audio = document.getElementById('audio-element');
    const currentSong = this.songs[this.currentSongIndex];
    
    audio.src = currentSong.url;
    audio.volume = this.volume;
    
    document.getElementById('song-title').textContent = currentSong.title;
    document.getElementById('song-artist').textContent = currentSong.artist;
    
    this.updateSongSelector();
  }
  
  updateSongSelector() {
    const select = document.getElementById('song-select');
    select.innerHTML = '';
    
    this.songs.forEach((song, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${song.artist} - ${song.title}`;
      option.selected = index === this.currentSongIndex;
      select.appendChild(option);
    });
  }
  
  togglePlay() {
    const audio = document.getElementById('audio-element');
    
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
  }
  
  updatePlayButton(playing) {
    this.isPlaying = playing;
    document.getElementById('play-btn').textContent = playing ? '⏸' : '▶';
  }
  
  nextSong() {
    this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length;
    this.loadSong();
    if (this.isPlaying) {
      document.getElementById('audio-element').play();
    }
  }
  
  prevSong() {
    this.currentSongIndex = this.currentSongIndex === 0 ? this.songs.length - 1 : this.currentSongIndex - 1;
    this.loadSong();
    if (this.isPlaying) {
      document.getElementById('audio-element').play();
    }
  }
  
  changeSong(index) {
    this.currentSongIndex = parseInt(index);
    this.loadSong();
    document.getElementById('audio-element').play();
  }
  
  toggleMute() {
    const audio = document.getElementById('audio-element');
    const muteBtn = document.getElementById('mute-btn');
    
    this.isMuted = !this.isMuted;
    audio.volume = this.isMuted ? 0 : this.volume;
    muteBtn.textContent = this.isMuted ? '🔇' : '🔊';
  }
  
  setVolume(value) {
    this.volume = parseFloat(value);
    if (!this.isMuted) {
      document.getElementById('audio-element').volume = this.volume;
    }
  }
  
  hidePlayer() {
    document.getElementById('music-player').classList.remove('visible');
  }
}

// Initialize player when page loads
document.addEventListener('DOMContentLoaded', () => {
  new MusicPlayer();
});
