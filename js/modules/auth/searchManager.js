
// Search Manager module for handling search functionality
const SearchManager = () => {
    // Setup search functionality
    const setupSearch = () => {
        // Find search input
        const searchInput = document.getElementById('movieSearch');
        if (!searchInput) return;
        
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase();
            const movieCards = document.querySelectorAll('.movie-card');
            
            if (movieCards.length === 0) {
                console.log('No movie cards found to search');
                return;
            }
            
            movieCards.forEach(card => {
                const title = card.querySelector('.movie-title')?.textContent.toLowerCase() || '';
                const genre = card.querySelector('.movie-genre')?.textContent.toLowerCase() || '';
                const language = card.querySelector('.movie-language')?.textContent.toLowerCase() || '';
                
                if (title.includes(searchTerm) || genre.includes(searchTerm) || language.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    };
    
    return {
        setupSearch
    };
};

export default SearchManager;
