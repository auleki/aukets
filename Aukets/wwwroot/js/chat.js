"use strict"

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

const sendButton = document.getElementById('sendButton')

sendButton.disabled = true

connection.on("ReceiveMessage", (user, message) => {
    var li = document.createElement('li')
    document.getElementById("messagesList").appendChild(li)

    li.textContent = `${user} says ${message}`
})

connection.start().then(() => {
    sendButton.disabled = false
}).catch(err => {
    return console.error(err.toString())
})

sendButton.addEventListener("click", event => {
    event.preventDefault()
    const user = document.getElementById('userInput').value;
    const message = document.getElementById('messageInput').value
    connection.invoke("SendMessage", user, message).catch(err => {
        return console.error(err.toString())
    })
})