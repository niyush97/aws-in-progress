const form = document.querySelector("#add-post");
const output = document.querySelector('#output');
const button = document.querySelector('#get-posts');


//>
async function getPosts() {
    try {
        const response = await fetch('http://localhost:8000/api/posts');
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        const posts = await response.json();
        output.innerHTML = posts
            .map(post => {
              const { id, ...rest } = post;
                return `<div>${
                    Object.entries(post) 
                        .map(([key, value]) => `${key}: ${value}`) 
                        .join(' ◽️ ')
                }</div>`;
            })
            .join('');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}
button.addEventListener('click', getPosts);

//> Add a new post
async function addPost(e) {
    e.preventDefault();
    const formData = new FormData(this);
    const postData = Object.fromEntries(formData.entries());

    try {
        const response = await fetch('http://localhost:8000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData),
        });

        if (!response.ok) {
            throw new Error(`Failed to create post: ${response.status} ${response.statusText}`);
        }

        const newPost = await response.json();
        console.log('Post created:', newPost);

        form.reset();

        const postEL = document.createElement('div');
        postEL.textContent = `${newPost.first_name} ${newPost.last_name} - ${newPost.email} - ${newPost.gender} - ${newPost.country} - ${newPost.job_title}`;
        output.appendChild(postEL);

        getPosts(); // refresh posts
        form.reset(); 
        showPopup('Post created successfully!'); 
    } catch (error) {
        console.error('Error creating post:', error);
    }
}
form.addEventListener('submit', addPost);


function showPopup(message) {
    const popup = document.createElement('div');
    popup.textContent = message;
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#4caf50'; // green for success
    popup.style.color = '#fff';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
    popup.style.zIndex = '1000';
    popup.style.fontFamily = 'Arial, sans-serif';

    document.body.appendChild(popup);

    // remove popup after 3s
    setTimeout(() => {
        popup.remove();
    }, 3000);
}