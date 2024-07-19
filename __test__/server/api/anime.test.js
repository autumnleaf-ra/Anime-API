const Request = require('supertest');

const TestHelper = require('../../../server/helpers/TestHelper');
const GeneralHelper = require('../../../server/helpers/GeneralHelper');
const anime = require('../../../server/api/anime');

let server;
describe('Anime', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/anime', anime);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Get All Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(200);
    });
  });

  describe('Search Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ movie: 'Naruto' });
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Ashiap Man' });
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
      expect(response.status).toBe(200);
    });
  });

  describe('Get Detail Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/anime/detail/19902');
      expect(response.status).toBe(500);
    });

    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/19902');
      expect(response.status).toBe(200);
    });

    test('should return 404, anime not found ', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/199025');
      expect(response.status).toBe(404);
    });
  });

  describe('Search By Genre Status', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/genre').send({ genre: 'action' });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/genre');
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/genre').send({ genre: 'xz,caslkdlasdk' });
      expect(response.status).toBe(404);
    });

    test('should return 200, with input string', async () => {
      const response = await Request(server).post('/api/v1/anime/genre').send({ genre: 'action' });
      expect(response.status).toBe(200);
    });

    test('should return 200, with input array', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/genre')
        .send({ genre: ['action', 'comedy'] });
      expect(response.status).toBe(200);
    });

    test('should return 200, with input status', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/genre')
        .send({ genre: ['action', 'comedy'], status: 'ONGOING' });
      expect(response.status).toBe(200);
    });
  });

  describe('Get Anime Episode', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/episode').send({ name: 'Naruto' });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/episode').send({ movie: 'Naruto' });
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/episode').send({ name: 'Ashiap Man' });
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/episode').send({ name: 'Naruto' });
      expect(response.status).toBe(200);
    });
  });

  describe('Get Anime Year', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).post('/api/v1/anime/year').send({ year: 2002 });
      expect(response.status).toBe(500);
    });

    test('should return 400', async () => {
      const response = await Request(server).post('/api/v1/anime/year').send({ month: 2002 });
      expect(response.status).toBe(400);
    });

    test('should return 404, anime not found', async () => {
      const response = await Request(server).post('/api/v1/anime/year').send({ year: 0 });
      expect(response.status).toBe(404);
    });

    test('should return 200', async () => {
      const response = await Request(server).post('/api/v1/anime/year').send({ year: 2002 });
      expect(response.status).toBe(200);
    });
  });
});
