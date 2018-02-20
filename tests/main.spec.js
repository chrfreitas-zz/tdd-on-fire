import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);
global.fetch = require('node-fetch');

import { search, searchAlbums, searchArtists, searchTracks, searchPlaylists } from '../src/main';

describe('Spotify Wrapper', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {
    it('should exist the search method', () => {
      expect(search).to.exist;
    })

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    })

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    })

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    })

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    })
  });

  describe('Generic Search', () => {
    it('should call fetch function', () => {
      const artists = search();
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fecth', () => {

      context('passing one type', () => {
        const artists = search('Incubus', 'artist');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'albums');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=albums');
      });

      context('passing one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album');
      });

    });

    it('should return the JSON Data from Promise', () => {
      promise.resolves({ body: 'json' });

      const artists = search('Incubus', 'artist');
      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });

  describe('searchArtists', () => {
    it('should call fetch function', () => {
      const artists = searchArtists('ACDC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('ACDC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=ACDC&type=artist');
    });
  });

  describe('searchAlbums', () => {
    it('should call fetch function', () => {
      const albums = searchAlbums('ACDC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('ACDC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=ACDC&type=album');
    });
  });

  describe('searchTracks', () => {
    it('should call fetch function', () => {
      const tracks = searchTracks('ACDC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('ACDC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=ACDC&type=track');
    });
  });

  describe('searchPlaylists', () => {
    it('should call fetch function', () => {
      const playlists = searchPlaylists('ACDC');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlists = searchPlaylists('ACDC');
      expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=ACDC&type=playlist');
    });
  });
});

