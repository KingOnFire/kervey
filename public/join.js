const button = document.querySelector("#join")
button.addEventListener("click", join)

function join(event) {
    code = document.querySelector("#code").value
    fetch(`/join/${code}`)
    .then(response => response.json())
    .then(json => {
        if (json.valid) {
            if (!localStorage.getItem(code)) {
                window.localStorage.setItem(code, "taken");
                window.location.assign("http://kervey.herokuapp.com/room/" + code);
            }
            else {
                document.querySelector("#error").textContent = "You've already answered"
            }
        }
        else {
            document.querySelector("#error").textContent = "Invalid Code"
        }
    })
}