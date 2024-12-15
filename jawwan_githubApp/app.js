document.addEventListener("DOMContentLoaded", () => {
const api_url='https://api.github.com/users/';
const inputField=document.getElementById("inputField");
const showProfile=document.getElementById("showProfile");


const searchUser = async () => {
  showProfile.innerHTML = '';
  const user_url = `${api_url}${inputField.value}`;
  try{
  const fetchData = await fetch(user_url);
     const response= await fetchData.json();

     if (response.message === "Not Found") {
      showProfile.innerHTML = `<h3>User not found. Please try again.</h3>`;
  } else {
      // Display the user data
      showData(response);
  }
} catch (error) {
  console.error("Error fetching data:", error);
  showProfile.innerHTML = `<h3>Error fetching data. Please try again later.</h3>`;
}
};

const showData = (data) => {
  showProfile.style.display = "block"; // Make the profile card visible
  showProfile.innerHTML = `
    <img src="${data.avatar_url}" alt="User Avatar">
    <h2>${data.name || "No Name Provided"}</h2>
    <h3>@${data.login}</h3>
    <p>Joined ${new Date(data.created_at).toDateString()}</p>
    
    <div class="stats">
      <div>
        <h4>Repos</h4>
        <span>${data.public_repos}</span>
      </div>
      <div>
        <h4>  Followers</h4>
        <span>${data.followers}</span>
      </div>
      <div>
        <h4>Following</h4>
        <span>${data.following}</span>
      </div>
    </div>
    
    <p><strong>Location:</strong> ${data.location || "Not Available"}</p>
    <p><strong>Website:</strong> <a href="${data.blog}" target="_blank">${data.blog || "Not Available"}</a></p>
    <p><strong>Company:</strong> ${data.company || "Not Available"}</p>
  `;
};


document.getElementById("searchButton").addEventListener("click", searchUser);
});