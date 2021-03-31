export default class Chat {
    constructor(){
        this.chatWrapper = document.querySelector('#chat-wrapper');
        this.injectHTML();
        this.events();
    }
    
    // events
    events(){

    }

    // methods
    injectHTML(){
        this.chatWrapper.innerHTML = `
            <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
            <div id="chat" class=""chat-log></div>
        `
    }    
}