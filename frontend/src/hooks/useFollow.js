

const follow = async(username) => {
    try {
        const chatUser = JSON.parse(localStorage.getItem('chat-user'));
        const token = chatUser.token;

        const response = await fetch(`http://localhost:8000/api/user/follow/${username}`, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Authorisation": `Bearer ${token}`,
            },
        });

        const data = response.json();

        return data;

    } catch(error) {
        const message = error.response ? error.response.data.message : error.message;
        return { success: false, message };
    }
}

