function movies(input) {
    let movies = [];

    while (input.length > 0) {
        let current = input.shift();
        
        if (current.includes('addMovie')) {
            let movie = {};
            let movieName = current.substring(9);
            movie.name = movieName;
            movies.push(movie);
        } else if (current.includes('directedBy')) {
            let [movieName, directorNames] = current.split(' directedBy ');
        
            movies.find(x => {
                if (x.name == movieName) {
                    x.director = directorNames;
                }
            });
        } else if (current.includes('onDate')) {
            let [movieName, movieDate] = current.split(' onDate ');
        
            movies.find(x => {
                if (x.name == movieName) {
                    x.date = movieDate;
                }
            });
        }
    }

    movies.forEach(x => {
        if (x.director && x.date) {
            console.log(JSON.stringify(x));
        }
    })
}

movies([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
]);