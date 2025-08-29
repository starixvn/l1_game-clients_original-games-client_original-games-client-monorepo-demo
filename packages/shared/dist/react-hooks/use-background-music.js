import { buildVersion } from "../constants";
import { path as soundsPath } from "./use-sound";
var path = "".concat(soundsPath, "bg-music/");
var initSongs = function (n) {
    var songs = [];
    for (var i = 1; i <= n; i++) {
        songs.push(i);
    }
    return songs;
};
export var songList = initSongs(4).map(function (x) { return "".concat(path, "song").concat(x, ".mp3?v=").concat(buildVersion); });
export var getRandomSong = function (currentSong) {
    var newSongList = songList.filter(function (s) { return s !== currentSong; });
    var randomSongIndex = Math.floor(Math.random() * newSongList.length);
    return newSongList[randomSongIndex];
};
