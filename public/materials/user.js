const users=[];
//join user to the chat
function joinChat(id,username,group) {
    // users.push({id:id,username:username,group:group});
    const user={id,username,group};
    users.push(user);
    return user;
};
function getcurentuser(id){
     return users.find(user=>user.id==id);
}
function userleave(id){
    const index=users.findIndex(user=>user.id===id);
    if(index!==-1){return users.splice(index,1)[0]

    }
}
function getuserroom(group){
    return users.filter(user=>user.group===group);
}
module.exports={joinChat,getcurentuser,
    userleave,
    getuserroom
};