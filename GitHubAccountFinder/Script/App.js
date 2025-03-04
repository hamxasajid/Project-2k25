// Fetch user profile data and display it on the page
function fetchUser() {
  let username = document.getElementById("username").value;
  let resultDiv = document.getElementById("result");
  let loadingSpinner = document.getElementById("loading");

  if (username === "") {
    resultDiv.innerHTML =
      "<p class='text-danger'>Please enter a GitHub username!</p>";
    return;
  }

  resultDiv.innerHTML = "";
  loadingSpinner.style.display = "block"; // Show spinner

  fetch(`https://api.github.com/users/${username}`)
    .then((response) => response.json())
    .then((data) => {
      if (!data.login) {
        throw new Error("User not found");
      }

      let organization = data.company
        ? `<p><i class="bi bi-building"></i> <strong>Organization:</strong> ${data.company}</p>`
        : `<p><i class="bi bi-building"></i> <strong>Organization:</strong> Not available</p>`;

      let createdAt = `<p><i class="bi bi-calendar-check"></i> <strong>Joined:</strong> ${new Date(
        data.created_at
      ).toDateString()}</p>`;

      let lastUpdated = `<p><i class="bi bi-pencil-square"></i> <strong>Last Updated:</strong> ${new Date(
        data.updated_at
      ).toDateString()}</p>`;

      let website = data.blog
        ? `<p><i class="bi bi-globe"></i> <strong>Website:</strong> <a href="${data.blog}" target="_blank">${data.blog}</a></p>`
        : "";

      fetch(`https://api.github.com/users/${username}/events/public`)
        .then((response) => response.json())
        .then((events) => {
          let email =
            "<p><i class='bi bi-envelope'></i> <strong>Email:</strong> Not available</p>";

          for (let event of events) {
            if (
              event.type === "PushEvent" &&
              event.payload.commits.length > 0
            ) {
              let commitEmail = event.payload.commits[0].author.email;
              if (commitEmail) {
                email = `<p><i class="bi bi-envelope"></i> <strong>Email:</strong> <a href="mailto:${commitEmail}">${commitEmail}</a></p>`;
                break;
              }
            }
          }

          displayUser(
            data,
            email,
            organization,
            createdAt,
            lastUpdated,
            website
          );
        })
        .catch(() =>
          displayUser(
            data,
            email,
            organization,
            createdAt,
            lastUpdated,
            website
          )
        );
    })
    .catch(() => {
      resultDiv.innerHTML =
        "<p class='text-danger text-center'>User not found!</p>";
    })
    .finally(() => {
      loadingSpinner.style.display = "none"; // Hide spinner
    });
}

function displayUser(
  data,
  email,
  organization,
  createdAt,
  lastUpdated,
  website
) {
  let resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
  <div class="user-card">
      <div class="button">
      <img src="${data.avatar_url}" class="user-avatar" alt="Profile Picture">
      <h3>${data.name || "No Name"} <span class="text-muted">(@${
    data.login
  })</span></h3>
      <p class="text-muted1">${data.bio || "No bio available"}</p>
      </div>
      <div class="info-text">
      <p><i class="bi bi-geo-alt"></i> <strong>Location:</strong> ${
        data.location || "Not available"
      }</p>
          ${organization}
          <p><i class="bi bi-box"></i> <strong>Public Repos:</strong> ${
            data.public_repos
          }</p>
          <p><i class="bi bi-people"></i> <strong>Followers:</strong> ${
            data.followers
          } | <strong>Following:</strong> ${data.following}</p>
          ${email}
          ${website}
          ${createdAt}
          ${lastUpdated}
          <div class="button">
          <p><a href="${
            data.html_url
          }" target="_blank" class="btn btn-dark profile-btn"><i class="bi bi-github"></i> View GitHub Profile</a></p></div>
      </div>
  </div>
`;
}
