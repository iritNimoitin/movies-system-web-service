
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
exports.getMovieFromDBbyId = function (id) {
    return new Promise((resolve, reject) => {
        Movie.findById(id, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        })
    });
}
exports.updateMovieDB = function (id, obj) {
    return new Promise((resolve, reject) => {
        Movie.findByIdAndUpdate(id, obj

            , function (err) {
                if (err) {
                    reject(err)
                }
                else {
                    resolve('Updated');
                }
            })
    })
}
exports.deleteMovieFromDB = function (obj) {
    return new Promise((resolve, reject) => {
        Movie.findOneAndDelete(obj, function (err) {
            if (err) {
                reject(err)
            }
            else {
                resolve('Deleted');
            }
        })
    })
}
exports.addOneMovie = function (obj) {
    return new Promise((resolve, reject) => {
        console.log(obj);
        let movie = new Movie(
            obj,
            // Genres: obj.Genres,
            // Name: obj.Name,
            // Image: obj.Image,
            //{ Premiered: obj.Premiered + 'T00:00:00.000Z' }
            //{ Premiered: obj.Premiered + 'T00:00:00.000Z' }
        );
        console.log(movie);
        movie.save(err => {
            if (err) {
                reject(err);
            }
            else {
                resolve('Created  with id : ' + movie._id);
            }
        })
    })
}
exports.getMovieNameById = async function (id) {
    let movie = await this.getMovieFromDBbyId(id);
    let movieName = movie.Name;
    return movieName;
}