$(() => {
    $("#send").click(() => {
        sendMessage({
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
      <p>  ${colorIdentifier(message.message)} </p>
    </div>`)

}

function colorIndentifier(message) {
    const colors = ['azul', ]
        case 'azul':
            return "blue"
        case 'green':
            return "green"
        case 'yellow':
            return "yellow"
        case 'yellow':
            return "yellow"
    }

}

function getMessages() {
    $.get('http://localhost:3000/messages', (data) => {
        data.forEach(addMessages);
    })
}

function sendMessage(message) {
    $.post('http://localhost:3000/messages', message)
}