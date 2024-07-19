const router = require('express').Router();
const CommonHelper = require('../helpers/CommonHelper');
const ValidationHelper = require('../helpers/ValidationHelper');
const AnimeHelper = require('../helpers/AnimeHelper');

const getAllAnime = async (req, res) => {
  try {
    // get data from jsonc
    const data = await AnimeHelper.getAnimeList(req);
    // return response success
    return res.send(data);
  } catch (error) {
    // return response error
    CommonHelper.log(['Anime', 'Get All Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const searchAnime = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByName(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Search Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeDetail = async (req, res) => {
  try {
    // check validation input
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeDetail(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Detail Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeByGenre = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.getAnimeByGenreStatusValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeByGenre(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Search Anime', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeEpisode = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchAnimeValidation(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeEpisode(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Anime Episode', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

const getAnimeYear = async (req, res) => {
  try {
    // check validation input
    ValidationHelper.searchAnimeYear(req.body);
    // Get detail anime by request body name
    const data = await AnimeHelper.getAnimeYear(req);
    // return response success
    return res.send(data);
  } catch (error) {
    CommonHelper.log(['Anime', 'Get Anime Year', 'ERROR'], {
      message: `${error}`,
      transaction_id: req.headers.transaction_id
    });
    return res.send(CommonHelper.errorResponse(error));
  }
};

router.get('/list', CommonHelper.preHandler, getAllAnime);
router.post('/search', CommonHelper.preHandler, searchAnime);
router.get('/detail/:id', CommonHelper.preHandler, getAnimeDetail);
router.post('/genre', CommonHelper.preHandler, getAnimeByGenre);
router.post('/episode', CommonHelper.preHandler, getAnimeEpisode);
router.post('/year', CommonHelper.preHandler, getAnimeYear);

module.exports = router;
