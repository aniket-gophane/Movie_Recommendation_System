const movies = [
    { 
        title: "Dune: Part Two", 
        genres: ["Sci-Fi", "Adventure"], 
        poster: "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
        trailer: "https://www.youtube.com/watch?v=Way9Dexny3w"
    },
    { 
        title: "Deadpool 3", 
        genres: ["Action", "Comedy", "Sci-Fi"], 
        poster: "https://image.tmdb.org/t/p/w500/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg",
        trailer: "https://www.youtube.com/watch?v=LO3n67BQvh0"
    },
    { 
        title: "Avatar: The Way of Water", 
        genres: ["Sci-Fi", "Adventure", "Action"], 
        poster: "https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg",
        trailer: "https://www.youtube.com/watch?v=d9MyW72ELq0"
    },
    { 
        title: "Spider-Man: No Way Home", 
        genres: ["Action", "Adventure", "Sci-Fi"], 
        poster: "https://image.tmdb.org/t/p/w500/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg",
        trailer: "https://www.youtube.com/watch?v=JfVOs4VSpmA"
    },
    { 
        title: "Tenet", 
        genres: ["Action", "Sci-Fi", "Thriller"], 
        poster: "https://image.tmdb.org/t/p/w500/k68nPLbIST6NP96JmTxmZijEvCA.jpg",
        trailer: "https://www.youtube.com/watch?v=LdOM0x0XDMo"
    },
    { 
        title: "Avengers: Endgame", 
        genres: ["Action", "Adventure", "Sci-Fi"], 
        poster: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
        trailer: "https://www.youtube.com/watch?v=TcMBFSGVi1c"
    },
    { 
        title: "The Super Mario Bros. Movie", 
        genres: ["Animation", "Adventure", "Comedy"], 
        poster: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
        trailer: "https://www.youtube.com/watch?v=TnGl01FkMMo"
    },
    { 
        title: "John Wick: Chapter 4", 
        genres: ["Action", "Thriller"], 
        poster: "https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
        trailer: "https://www.youtube.com/watch?v=qEVUtrk8_B4"
    },
    { 
        title: "The Batman", 
        genres: ["Action", "Crime", "Drama"], 
        poster: "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
        trailer: "https://www.youtube.com/watch?v=mqqft2x_Aa4"
    },
    { 
        title: "Barbie", 
        genres: ["Comedy", "Fantasy"], 
        poster: "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeF1lgXO.jpg",
        trailer: "https://www.youtube.com/watch?v=pBk4NYhWNMM"
    }
];

// Load users & watch history from localStorage
let users = JSON.parse(localStorage.getItem("users")) || ["Guest"];
let watchHistory = JSON.parse(localStorage.getItem("watchHistory")) || {};

// Populate user dropdown
const userSelect = document.getElementById("userSelect");
function loadUsers() {
    userSelect.innerHTML = "";
    users.forEach(user => {
        let option = document.createElement("option");
        option.textContent = user;
        userSelect.appendChild(option);
    });
}

// Add new user
function addUser() {
    let newUser = prompt("Enter your name:");
    if (newUser && !users.includes(newUser)) {
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        loadUsers();
    }
}

// Remove user
function removeUser() {
    let userToRemove = userSelect.value;
    if (userToRemove !== "Guest") {
        users = users.filter(user => user !== userToRemove);
        delete watchHistory[userToRemove];
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
        loadUsers();
        displayWatchHistory();
    } else {
        alert("Cannot remove default Guest user!");
    }
}

// Load movies
const movieSelect = document.getElementById("movieSelect");
movies.forEach((movie, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.textContent = movie.title;
    movieSelect.appendChild(option);
});

// Watch Movie
function watchMovie() {
    let selectedMovie = movies[movieSelect.value];
    let currentUser = userSelect.value;

    if (!watchHistory[currentUser]) watchHistory[currentUser] = [];
    watchHistory[currentUser].push(selectedMovie.title);
    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));

    displayMovie(selectedMovie);
    displayWatchHistory();
}

// Display movie details
function displayMovie(movie) {
    document.getElementById("moviePoster").src = movie.poster;
    document.getElementById("movieTitle").textContent = movie.title;
    document.getElementById("movieGenres").textContent = movie.genres.join(", ");
    document.getElementById("movieTrailer").href = movie.trailer;
}

// Show Watch History
function displayWatchHistory() {
    let historyList = document.getElementById("watchHistory");
    historyList.innerHTML = "";
    let currentUser = userSelect.value;
    (watchHistory[currentUser] || []).forEach(movie => {
        let li = document.createElement("li");
        li.textContent = movie;
        historyList.appendChild(li);
    });
}

// Clear Watch History
function clearHistory() {
    let currentUser = userSelect.value;
    watchHistory[currentUser] = [];
    localStorage.setItem("watchHistory", JSON.stringify(watchHistory));
    displayWatchHistory();
}

// Load everything on start
loadUsers();
displayWatchHistory();
