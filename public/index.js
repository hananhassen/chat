// let loginPage=document.getElementById("login-page");
// let join=document.getElementById("join-chat");
let texArea=document.getElementById("texting-area");
let chatMessages= document.getElementById('conversation-area');

let chatingPlace=document.getElementById("chating-spaced");
// let uname=document.getElementById("uname").value;
// let gname=document.getElementById("gname").value;
const groupN=document.getElementById('group');
const usersN=document.getElementById('users');



const {username,group }=Qs.parse(location.search,{
    ignoreQueryPrefix:true
 }) ;
 console.log(username,group);


const socket=io();
//  console.log(socket);
 socket.emit('join',{username,group});
 //get group and users
 socket.on('groupusers',({group,users})=>{
    outputgroup(group);
    outputusers(users);
 })

 socket.on('message',message=>{
    console.log(message);
    displayMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;


 });

 

// console.log(uname);
// loginPage.addEventListener("submit",(e)=>{
//     e.preventDefault();
//     if(uname ===""||gname ===""){ alert("user-name and can't be empty")
// }
//     else{chatingPlace.style.display="block";
//         loginPage.style.display="none";
//        ;
//     }

// })
//let mainmsg=document.getElementById('text-message').value;
texArea.addEventListener('submit',(e)=>{
    e.preventDefault();
    let mainMsg=e.target.elements.message.value;
    mainMsg = mainMsg.trim();

    if (!mainMsg) {
      return false;
    }
    socket.emit('chathing',mainMsg);
    e.target.elements.message.value='';
    e.target.elements.message.focus();
    
     

})
function displayMessage(message){
    let div=document.createElement('div') ;
    div.classList.add('mess');
            div.innerHTML=` 
          <p class="nm">${message.username}:<span class="ti">${message.time}</span></p>
          <p>${message.text}</p>
      ` 
  document.getElementById('conversation-area').appendChild(div);

  
};
///group and users
function outputgroup(group){


    groupN.innerText=group;


}
function outputusers(users){
    // let user_least=createElement('div');
    //     user_least.innerHTML=users;
        usersN.innerHTML=`${users.map(user=>`<li>${user.username}</li>`).join('')}`
    
}
//Prompt the user before leave chat room
document.getElementById('leave-btn').addEventListener('click', () => {
    const leaveRoom = confirm('Are you sure you want to leave the chatroom?');
    if (leaveRoom) {
      window.location = '../index.html';
    }
else{
    
} });
