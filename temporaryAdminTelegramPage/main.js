let currentUser;

const searchFunction = async () => {
    const searchInput = document.querySelector(".searchInput");

    const resultUser = document.querySelector(".resultUser");
    const errorMessage = document.querySelector(".errorMessage");

    resultUser.classList.remove("active");
    errorMessage.classList.remove("active");

    const titleUserId = document.querySelector(".TitleUserId");
    const database_id = document.querySelector(".database_id");
    const username = document.querySelector(".username");
    const name = document.querySelector(".name");
    const surname = document.querySelector(".surname");
    const tokens = document.querySelector(".tokens");

    if (!searchInput.value) { return; }

    let res = await fetch(`/getTelegramProfile/${searchInput.value}`).catch(console.error);
    let resJson = await res.json().catch(console.error);

    if (resJson.status == "error") {
        errorMessage.textContent = resJson.message;

        errorMessage.classList.add("active");
        return;
    }
    else if (resJson.status == "success") {
        currentUser = resJson.data;

        titleUserId.textContent = `User ${resJson.data.telegramId}` || "id not found??";
        database_id.textContent = resJson.data._id || "id not found??";
        username.textContent = resJson.data.username || "not set";
        name.textContent = resJson.data.name || "not set";
        surname.textContent = resJson.data.surname || "not set";

        tokens.value = resJson.data.tokens || 0;

        resultUser.classList.add("active");
        return;
    }
}

const editCurrentUser = async (editButton) => {
    const tokens = document.querySelector(".tokens");

    editButton.style.color = "black";

    let res = await fetch("/editTelegramProfile", {
        method: "post",
        mode: "cors",
        headers: {
            'Access-Control-Allow-Origin':"*",
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            id: currentUser.telegramId,
            tokens: tokens.value
        })
    }).catch(console.error);
    let resJson = await res.json().catch(console.error);

    if (resJson.status == "error") {
        editButton.style.color = "red";
        editButton.textContent = "Error: " + resJson.message
        setTimeout(() => {
            editButton.style.color = "black";
            editButton.textContent = "Edit"
        }, 5000);
    }
    else if (resJson.status == "success") {
        editButton.style.color = "green";
        editButton.textContent = "Success"
        setTimeout(() => {
            editButton.style.color = "black";
            editButton.textContent = "Edit"
        }, 5000);
    }
}