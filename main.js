// Tableau d'objets

const musique = [
  {
    src: "./musique/ShapeofYou.mp3",
    title: "Shape of you",
    artist: "Ed Sheeran",
    album: "./image/albumsheeran.jpg",
  },
  {
    src: "./musique/BadLiar.mp3",
    title: "Bad Liar",
    artist: "Imagine Dragons",
    album: "./image/albumimagine.jpg",
  },
  {
    src: "./musique/Bliss.mp3",
    title: "Bliss",
    artist: "Luke Bergs",
    album: "./image/albumbergs.jpg",
  },
  {
    src: "./musique/Sober.mp3",
    title: "Sober",
    artist: "Pink",
    album: "./image/albumpink.jpg",
  },
  {
    src: "./musique/Tropical-soul.mp3",
    title: "Tropical-Soul",
    artist: "Luke Bergs",
    album: "./image/albumbergs.jpg",
  },
];

// Declaration des variables

let audio = document.querySelector("audio");
let btnPlay = document.querySelector(".btnPlay");
let titre = document.querySelector(".titre");
let artiste = document.querySelector(".nomArtiste");
let album = document.querySelector(".albumX");
let tempsCouru = document.querySelector(".tempsCouru");
let tempsTotal = document.querySelector(".tempsTotal");
let barreAudio = document.querySelector(".barreAudio");
let progress = document.querySelector(".progresseBarre");
let mute = document.querySelector(".iconeVolume");
let son = document.querySelector(".volume");
let stop = document.querySelector(".btnStop");
let i = 0;

// Toggle play pause

btnPlay.addEventListener("click", togglePlayPause);

function play() {
  btnPlay.querySelector("img").src = "./icon/pause.svg";
  audio.play();
  btnPlay.value = "played";
}

function pause() {
  btnPlay.querySelector("img").src = "./icon/play.svg";
  audio.pause();
  btnPlay.value = "paused";
}

function togglePlayPause() {
  if (audio.paused) {
    play();
  } else {
    pause();
  }
}

//Affichage titre artiste

function lire(musique) {
  titre.textContent = musique.title;
  audio.src = musique.src;
  artiste.textContent = musique.artist;
  album.src = musique.album;
}

lire(musique[i]); //appel de la fonction pour l'affichage

// precedent

let btnPrec = document.querySelector(".btnPrec");
btnPrec.addEventListener("click", (retour) => {
  i--;
  if (i < 0) {
    i = musique.length - 1;
  }

  lire(musique[i]);

  if (btnPlay.value == "played") {
    togglePlayPause();
  }
});

// suivant

btnSuite = document.querySelector(".btnSuite");
btnSuite.addEventListener("click", (suite) => {
  i++;
  if (i >= musique.length) {
    //i=20 lenth=20
    i = 0;
  }
  lire(musique[i]);
  //TODO condition
  console.log("audio", audio);

  if (btnPlay.value == "played") {
    togglePlayPause();
  }
});

// mute

mute.addEventListener("click", (toggleMute) => {
  if (audio.muted) {
    audio.muted = false;
    mute.src = "./icon/volume.svg";
  } else {
    audio.muted = true;
    mute.src = "./icon/mute.svg";
  }
});

// volume

son.addEventListener("click", (modifVolume) => {
  audio.volume = son.value / 100;
  console.log(audio.volume);
  if (audio.volume == 0) {
    mute.src = "./icon/mute.svg";
  } else {
    mute.src = "./icon/volume.svg";
  }
});

// stop/reset

stop.addEventListener("click", (stopMusic) => {
  audio.currentTime = 0;
  pause();
});

// temps ecoulé et temps total musique
//loadeddata est un evenement qui permet de charger des données actuelles,sans forcément lancer l'audio
let temp;
let totalTemp;
audio.addEventListener("loadeddata", ecouleTemps);

function ecouleTemps() {
  temp = audio.currentTime;
  totalTemp = audio.duration;
  // console.log(totalTemp);

  formatTemps(temp, tempsCouru);
  formatTemps(totalTemp, tempsTotal);
}

//converti le temps
function formatTemps(valeur, element) {
  const minute = Math.trunc(valeur / 60);
  let seconde = Math.trunc(valeur % 60);
  if (seconde < 10) {
    seconde = "0" + seconde;
  }
  element.textContent = minute + ":" + seconde;
}

// barre de progression

audio.addEventListener("timeupdate", (progression) => {
  let avance = audio.currentTime;
  formatTemps(avance, tempsCouru); //appel de la fonction formatTemps
  // console.log(avance);//temps en secondes (4:23=263sec)
  let position = avance / totalTemp;
  // console.log(position);
  // console.log(totalTemp);
  progress.style.transform = `scaleX(${position})`;

  //Passe à la chanson suivante lorsque la chanson ecouté est finie

  if (audio.ended) {
    i++;
    lire(musique[i]);
    togglePlayPause();
  }
});

// position sur la barre

let rect = barreAudio.getBoundingClientRect();
let largeur = rect.width;
barreAudio.addEventListener("click", positionMusic);

function positionMusic(e) {
  let x = e.clientX - rect.left;
  // console.log(e.clientX, rect.left,x);

  let widthPercent = x / largeur;
  // console.log(widthPercent);
  audio.currentTime = audio.duration * widthPercent;
}
