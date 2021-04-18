$(() => {
    $("#send").click(() => {
        sendMessage({
            style: $("#style").val(),
            name: $("#name").val(),
            message: $("#message").val()
        });
    })
    getMessages()
})

function addMessages(message) {
    $("#messages").append(`
    <div>
      <h4> ${message.name} </h4>
      <p style="${message.style}">  ${message.message} </p>
    </div>`)

}


function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(addMessages);
    })
}

function sendMessage(message) {
    $.post('http://localhost:3000/messages', message)
}