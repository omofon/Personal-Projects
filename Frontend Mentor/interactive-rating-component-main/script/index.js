document.addEventListener("DOMContentLoaded", ()=> {
    const ratingCard = document.getElementById("rating-card");
    const thankYouCard = document.getElementById("thank-you-card")
    const ratingButtons = document.querySelectorAll(button[role="radio"]);
    const submitButton = document.querySelector(button[type="submit"]);
    const selectedRating = null;

    
    // Hide Card
    function hideCard(cardElement) {
        cardElement.classList.add("hidden");
    }

    // Reveal Card
    function showCard(cardElement) {
        cardElement.classList.remove("hidden")
    }

    function getRating() {
        if (!selectedRating) return null;


    }
})