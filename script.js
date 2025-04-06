// Change Background Color
const changeColorBtn = document.getElementById("changeColorBtn");
changeColorBtn.addEventListener("click", () => {
  document.body.style.backgroundColor = getRandomColor();
});

// Generate random background color
function getRandomColor() {
  const colors = ["#000000", "#1a1a1a", "#002b36", "#003300", "#111111"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Fetch data from public API and show posts
const fetchPostsBtn = document.getElementById("fetchPostsBtn");
const postsContainer = document.getElementById("postsContainer");

fetchPostsBtn.addEventListener("click", () => {
  fetch("https://jsonplaceholder.typicode.com/posts?_limit=5")
    .then(response => response.json())
    .then(data => {
      postsContainer.innerHTML = ""; // Clear existing
      data.forEach(post => {
        const postElement = document.createElement("div");
        postElement.classList.add("card", "bg-dark", "text-light", "mb-3", "border", "border-success");
        postElement.innerHTML = `
          <div class="card-body">
            <h5 class="card-title text-success">${post.title}</h5>
            <p class="card-text">${post.body}</p>
          </div>
        `;
        postsContainer.appendChild(postElement);
      });
    })
    .catch(error => {
      postsContainer.innerHTML = `<p class="text-danger">Failed to load posts.</p>`;
      console.error("Error fetching posts:", error);
    });
});

// Form validation
const form = document.getElementById("bookForm");
const errorMessages = document.getElementById("errorMessages");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const book = document.getElementById("book").value.trim();
  const message = document.getElementById("message").value.trim();

  let errors = [];

  if (name === "") errors.push("Name is required.");
  if (email === "") errors.push("Email is required.");
  else if (!validateEmail(email)) errors.push("Enter a valid email address.");
  if (book === "") errors.push("Favorite book is required.");
  if (message.length < 10) errors.push("Message must be at least 10 characters.");

  if (errors.length > 0) {
    errorMessages.innerHTML = errors.join("<br>");
  } else {
    errorMessages.innerHTML = "";
    alert("Thank you! Your form has been submitted successfully.");
    form.reset();
  }
});

function validateEmail(email) {
  // Basic email pattern
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}
