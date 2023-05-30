var username = window.prompt("Please enter your name: ")
usernamediv= document.getElementById("username")
usernamediv.innerText = username
let msg = document.getElementById('msg')
let chat = document.getElementById('chat')
var onlineuser=document.getElementById("onlineusers")
let mywebsocket  = new WebSocket("ws://localhost:8000")
console.log(mywebsocket)

mywebsocket.onopen= function (){
    data_to_send = {
        "username": username,
        "login":true
    }

    data = JSON.stringify(data_to_send)
    mywebsocket.send(data)
}


function styleString(text) {
  // Apply the desired styling to the string using HTML tags and CSS
  var styledText = "<span style='color: red; font-weight: bold;'>" + text + "</span>";

  return styledText;
}
function styleNormalMessage(text) {
  // Apply the desired styling to the string using HTML tags and CSS
  var styledText = "<p style='color: black; font-weight: bold;'>" + text + "</p>";

  return styledText;
}
mywebsocket.onmessage= function (event){

    console.log(event.data, typeof data) // string
    data = JSON.parse(event.data)
    if (data.type === "logout") {
        chat.innerHTML += styleString(data.message)
        onlineuser.innerHTML= "Online User" + data.onlineusers.join(", ")
    }else if (data.type === "login") {
            chat.innerHTML += styleString(data.message)
            onlineuser.innerHTML +="\n"+ data.onlineusers.join(", ")
    } else {
        chat.innerHTML += styleNormalMessage(data.message)
    }
}

mywebsocket.onerror = function (){
    alert("server is not accepting connection right now ")
}

mywebsocket.onclose = function (){


}

msg.addEventListener("keyup",function (event) {
    console.log(event)
    if (event.code==="Enter"){
        mymsg =msg.value
        data_to_send = {
        "message": mymsg,
        "type":"chat",
        "username":username
        };

        data= JSON.stringify(data_to_send);
        mywebsocket.send(data);
        msg.value='';
        chat.innerHTML+="Me:"+mymsg+"\n"

    }
});
