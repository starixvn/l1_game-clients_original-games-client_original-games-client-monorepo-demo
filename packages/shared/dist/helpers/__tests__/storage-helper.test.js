import { buildUserSpecificLocalStorageKey, getUserLatestGameId, setUserLatestGameId, StorageHelper } from '../storage-helper';
// Mock dependencies
jest.mock('../../app-settings', function () { return ({
    getAppSettings: function () { return ({ appType: 1 }); }
}); });
describe('User-specific latestGameId functionality (deprecated)', function () {
    beforeEach(function () {
        localStorage.clear();
        Object.defineProperty(globalThis, 'location', {
            value: { hostname: 'localhost' },
            writable: true
        });
    });
    describe('buildUserSpecificLocalStorageKey', function () {
        it('should create user-specific keys correctly', function () {
            var baseKey = 'latest-game-id';
            var username = 'testuser';
            var result = buildUserSpecificLocalStorageKey(baseKey, username);
            expect(result).toBe('localhost.latest-game-id.1.testuser');
        });
        it('should create base key when no username provided', function () {
            var baseKey = 'latest-game-id';
            var result = buildUserSpecificLocalStorageKey(baseKey);
            expect(result).toBe('localhost.latest-game-id.1');
        });
    });
    describe('getUserLatestGameId (no-op)', function () {
        it('should always return 0 regardless of username or stored value', function () {
            // Even if something is stored, getter returns 0
            var username = 'testuser';
            var userKey = buildUserSpecificLocalStorageKey('latest-game-id', username);
            StorageHelper.set(userKey, 9999);
            expect(getUserLatestGameId(username)).toBe(0);
            expect(getUserLatestGameId()).toBe(0);
        });
    });
    describe('setUserLatestGameId (no-op)', function () {
        it('should not write anything to storage', function () {
            var spy = jest.spyOn(StorageHelper, 'set');
            setUserLatestGameId(1005, 'user');
            setUserLatestGameId(1005);
            expect(spy).not.toHaveBeenCalled();
            spy.mockRestore();
        });
    });
});
