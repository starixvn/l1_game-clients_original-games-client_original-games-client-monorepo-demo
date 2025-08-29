import { songList, getRandomSong } from "../use-background-music";
import { buildVersion } from "../../constants";
import { path as soundsPath } from "../use-sound";
describe("use-background-music", function () {
    var expectedBasePath = "".concat(soundsPath, "bg-music/");
    describe("songList", function () {
        it("should generate correct list of 4 songs with proper paths and version", function () {
            // Arrange
            var expectedSongs = [
                "".concat(expectedBasePath, "song1.mp3?v=").concat(buildVersion),
                "".concat(expectedBasePath, "song2.mp3?v=").concat(buildVersion),
                "".concat(expectedBasePath, "song3.mp3?v=").concat(buildVersion),
                "".concat(expectedBasePath, "song4.mp3?v=").concat(buildVersion),
            ];
            // Assert
            expect(songList).toEqual(expectedSongs);
            expect(songList).toHaveLength(4);
        });
    });
    describe("getRandomSong", function () {
        it("should return a different song than the current one", function () {
            // Arrange
            var currentSong = "".concat(expectedBasePath, "song1.mp3?v=").concat(buildVersion);
            // Act
            var result = getRandomSong(currentSong);
            // Assert
            expect(result).not.toBe(currentSong);
            expect(songList).toContain(result);
        });
        it("should return a song from the available list", function () {
            // Arrange
            var currentSong = "".concat(expectedBasePath, "song2.mp3?v=").concat(buildVersion);
            // Act
            var result = getRandomSong(currentSong);
            // Assert
            expect(songList).toContain(result);
        });
        it("should maintain randomness across multiple calls", function () {
            // Arrange
            var currentSong = "".concat(expectedBasePath, "song1.mp3?v=").concat(buildVersion);
            var results = new Set();
            var iterations = 100;
            // Act
            for (var i = 0; i < iterations; i++) {
                results.add(getRandomSong(currentSong));
            }
            // Assert
            // With enough iterations, we should get all possible songs
            expect(results.size).toBeGreaterThan(2); // We should at least get 3 different songs
            // Verify all results are valid songs
            results.forEach(function (song) {
                expect(songList).toContain(song);
                expect(song).not.toBe(currentSong);
            });
        });
        it("should handle edge case when current song is not in the list", function () {
            // Arrange
            var invalidSong = "".concat(expectedBasePath, "nonexistent.mp3?v=").concat(buildVersion);
            // Act
            var result = getRandomSong(invalidSong);
            // Assert
            expect(songList).toContain(result);
        });
    });
});
