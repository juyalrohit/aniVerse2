let search_space = document.querySelector('.search-bar');
let lense = document.querySelector('.ri-search-2-line');
search_space.addEventListener('mouseenter' ,function(){
       lense.style.opacity = "1";
});
search_space.addEventListener('mouseleave' ,function(){
    
    lense.style.opacity = "0.4";
});

function showPage(pageId){
    let pages = document.querySelectorAll('.page');
    if(window.innerWidth<550){
        pages.forEach((element) => {
            element.style.display = "none";
        });

      document.getElementById(pageId).style.display = 'block';
    }
    else{
    document.getElementById(pageId).style.display = 'block';
    }
}

function closePage(pageId){
    let pages = document.querySelectorAll('.page');
    if(window.innerWidth<550){
        pages.forEach((element) => {
            element.style.display = "block";
        });

      document.getElementById(pageId).style.display = 'none';
    }
    else{
    document.getElementById(pageId).style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector('.search-icon').addEventListener('click', fetchAnime);
    const inputArea = document.getElementById('input-area');
    inputArea.addEventListener('keydown',function(event){
      if(event.key=='Enter'){
        event.preventDefault();
        fetchAnime();
      }
    });
  });


const MainContainer = document.querySelector('.main-container');

async function anime(query){
  MainContainer.style.display = "none";
  const animeResult = document.getElementById('anime-result');

  
    if (!query) {
      console.log("No search query entered."); 
      animeResult.style.display = "none";
      MainContainer.style.display = "block"
      return;
    }
  
    animeResult.style.display = "block"; // Show results container
    animeResult.innerHTML = "Loading..."; // Display loading text
  
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();
  
      animeResult.innerHTML = ""; // Clear loading text

      animeResult.innerHTML += ' <span class="cut">&times;</span>'

  
      if (data.data && data.data.length > 0) {
       
        data.data.forEach(anime => {
          let title = '';
          let episodes = anime.episodes;
          if(anime.title_english==null){
            title = anime.title;
          }
          else{
            title = anime.title_english;
          }

        if(anime.title=='One Piece'){
          episodes = 1122;
        }

          
          
          animeResult.innerHTML += `
            <div class="anime-item">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
              <div>
                <h2>${title}</h2>
                <p class="rating">Rating: ${anime.score}</p>
                <p class="ratedby">Rated By: ${anime.scored_by}</p>
                <p class="episodes"> Episodes: ${episodes}</p>
                <p class="duration"> Duration: ${anime.duration}</p>
                <div class="synopsis-container">
                <p class="synopsis">${anime.synopsis}</p>
               <span class="toggle-btn"><i class="ri-arrow-down-wide-line"></i></span>
            </div>
              </div>
            </div>
          `;
      });
      }
     else {
        animeResult.innerHTML = `
        <div class="ResulNotFount"> 
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511608-2133696.png"/>
        <button class="search-again" >SEARCH AGAIN</button>
        </div>`
      }
    } catch (error) {
      animeResult.innerHTML = "An error occurred. Please try again.";
      console.error("Error fetching data:", error); // Debug log
    }

  }


async function fetchAnime() {
    MainContainer.style.display = "none";
    
    const query = document.getElementById('input-area').innerText.trim();
    const animeResult = document.getElementById('anime-result');

  
  
    if (!query) {
      console.log("No search query entered."); // Debug log
      animeResult.style.display = "none";
      MainContainer.style.display = "block";
      return;
    }
  
    animeResult.style.display = "block"; // Show results container
    animeResult.innerHTML = "Loading..."; // Display loading text
  
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
      const data = await response.json();
  
      console.log("API data received:", data); // Debug log
      animeResult.innerHTML = ""; // Clear loading text

      animeResult.innerHTML += ' <span class="cut">&times;</span>'

      

  
      if (data.data && data.data.length > 0) {
       
        data.data.forEach(anime => {
          let title = '';
          let episodes = anime.episodes;
          if(anime.title_english==null){
            title = anime.title;
          }
          else{
            title = anime.title_english;
          }

        if(anime.title=='One Piece'){
          episodes = 1122;
        }

          
          
          animeResult.innerHTML += `
            <div class="anime-item">
              <img src="${anime.images.jpg.image_url}" alt="${anime.title}" />
              <div>
                <h2>${title}</h2>
                <p class="rating">Rating: ${anime.score}</p>
                <p class="ratedby">Rated By: ${anime.scored_by}</p>
                <p class="episodes"> Episodes: ${episodes}</p>
                <p class="duration"> Duration: ${anime.duration}</p>
                <div class="synopsis-container">
                <p class="synopsis">${anime.synopsis}</p>
               <span class="toggle-btn"><i class="ri-arrow-down-wide-line"></i></span>
            </div>
              </div>
            </div>
          `;
    
        });
      }
     else {
        animeResult.innerHTML = `
        <div class="ResulNotFount"> 
        <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-search-found-2511608-2133696.png"/>
        <button class="search-again" >SEARCH AGAIN</button>
        </div>`
      }
    } catch (error) {
      animeResult.innerHTML = "An error occurred. Please try again.";
      console.error("Error fetching data:", error); // Debug log
    }
  }


  const cutAnimeResult = document.querySelector('.cut');

  document.body.addEventListener('click', (event) => {
    console.log("Body clicked");
    if (event.target.classList.contains('cut')) {
     
      const animeResult = document.getElementById('anime-result');
     
  
      animeResult.style.display = "none";
      MainContainer.style.display = "block";
    }
    else if(event.target.classList.contains('search-again')){
      const animeResult = document.getElementById('anime-result');

      animeResult.style.display = "none";
      MainContainer.style.display = "block"
    }

    else  if (event.target.closest('.toggle-btn')) {
      const synopsisContainer = event.target.closest('.toggle-btn').previousElementSibling.parentElement;
      synopsisContainer.classList.toggle('expanded'); // Toggles full view
  
      const toggleBtn = event.target.closest('.toggle-btn');
      // Updates the button icon based on the expanded state
      toggleBtn.innerHTML = synopsisContainer.classList.contains('expanded') 
        ? '<i class="ri-arrow-up-wide-line"></i>' 
        : '<i class="ri-arrow-down-wide-line"></i>';
  
    }
   
  });

  if(window.innerWidth<350){
    document.querySelector('#change').innerHTML =  " Hi, I'm Rohit Juyal, a passionate frontend developer who loves bringing ideas to life with clean, dynamic designs. I’m also an anime enthusiast.";
  }

// Verify if added to the DOM

let lastScrollTop = 0;
const navbarLogo = document.querySelector('.nav-bar-logo');

window.addEventListener('scroll', function() {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > 50){
    // Scrolling down
    navbarLogo.classList.add('hidden-logo');
    navbarLogo.classList.remove('show-logo');
  } else {
    // Scrolling up
    navbarLogo.classList.remove('hidden-logo');
    navbarLogo.classList.add('show-logo');
  }

 
});




  