const Path = require('path');
const Boom = require('boom');
const CommonHelper = require('./CommonHelper');
const GeneralHelper = require('./GeneralHelper');

const ANIME_DATA = Path.join(
  __dirname,
  process.env.NODE_ENV === 'test' ? '../../assets/anime_test.json' : '../../assets/anime.json'
);

const getAnimeList = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 10;

    const animeData = data.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.tags
    }));

    const animeDataLimit = animeData.slice(offset, offset + limit);

    return {
      count: animeDataLimit.length,
      list: animeDataLimit
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByName = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.filter((item) => item.title.toLowerCase().includes(req.body.name.toLowerCase()));

    if (animeDetail.length === 0) {
      return Boom.notFound('Anime not found');
    }
    const animeList = animeDetail.map((item) => item.title);

    return {
      count: animeDetail.length,
      list: animeList,
      detail: animeDetail
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeByName', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeDetail = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');

    const animeDetail = data.find((item) => item.id === parseInt(req.params.id, 10));

    if (!animeDetail) {
      return Boom.notFound(`Anime with id ${req.params.id} not found`);
    }

    return {
      list: {
        id: animeDetail.id,
        title: animeDetail.title,
        type: animeDetail.type,
        episodes: animeDetail.episodes,
        status: animeDetail.status,
        picture: animeDetail.picture,
        thumbnail: animeDetail.thumbnail,
        genre: animeDetail.tags
      }
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeByGenre = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const mapGenre = [];

    if (typeof req.body.genre === 'string') {
      mapGenre.push(req.body.genre.toLowerCase());
    } else if (Array.isArray(req.body.genre)) {
      mapGenre.push(...req.body.genre.map((item) => item.toLowerCase()));
    }

    const animeDetailFilteredByGenre = data.filter((tag) => tag.tags.some((item) => mapGenre.includes(item)));

    if (animeDetailFilteredByGenre.length === 0) {
      return Boom.notFound('Anime not found');
    }

    let animeDetail = animeDetailFilteredByGenre;

    if (req.body.status) {
      animeDetail = animeDetail.filter((item) => item.status === req.body.status);
    }

    const animeData = animeDetail.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.tags
    }));

    return {
      count: animeDetail.length,
      list: animeData
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeList', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeEpisode = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.filter((item) => item.title.toLowerCase().includes(req.body.name.toLowerCase()));

    if (animeDetail.length === 0) {
      return Boom.notFound('Anime not found');
    }

    const animeList = animeDetail.map((item) => ({
      id: item.id,
      title: item.title,
      episodes: item.episodes
    }));

    return {
      count: animeDetail.length,
      list: animeList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeEpisode', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

const getAnimeYear = async (req) => {
  try {
    const data = await GeneralHelper.readLargeFile(ANIME_DATA, 'data.*');
    const animeDetail = data.filter((item) => item.animeSeason.year === req.body.year);

    if (animeDetail.length === 0) {
      return Boom.notFound('Anime not found');
    }

    const animeList = animeDetail.map((item) => ({
      id: item.id,
      title: item.title,
      type: item.type,
      episodes: item.episodes,
      status: item.status,
      picture: item.picture,
      thumbnail: item.thumbnail,
      genre: item.tags
    }));

    return {
      count: animeDetail.length,
      list: animeList
    };
  } catch (error) {
    CommonHelper.log(['Anime Helper', 'getAnimeYear', 'ERROR'], { message: `${error}` });
    throw CommonHelper.errorResponse(error);
  }
};

module.exports = { getAnimeByName, getAnimeList, getAnimeDetail, getAnimeByGenre, getAnimeEpisode, getAnimeYear };
