
const RestDal = require('../DALS/moviesRestDal');
const Movie = require('../Models/moviesModel');

exports.addMoviesToDB = async function () {
    try {
        const resp = await RestDal.getMovies();
        const FullDataArr = resp.data;
        FullDataArr.forEach(movie => {
            const movies = new Movie({
                Name: movie.name,
                Genres: movie.genres,
                Image: movie.image.original,
                Premiered: movie.premiered
            });
            movies.save((err) => {
                if (err) {
                    return err;
                }
            });
        });

    } catch (err) {
        return err;
    }
}

exports.getAllMoviesFromDB = function () {
    return new Promise((resolve, reject) => {
        Movie.find({}, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });

}

