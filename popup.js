/* chrome.runtime.onMessage.addListener(function(response,sender,sendReponse){
    if(response.action === 'update_popup_list'){
        console.log("upl: ", response.action_data.global_list.newValue);
    }
}) */


const updateTextBox = function(content, target){
    if(content === ""){
        target.innerHTML = content;
    } else{
        let current_list = content.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
        var text = "";
        for(const n in current_list){
            text += `${current_list[n]} ${n}\r\n`;
        };
        target.innerHTML = text;
    }
}
const textbox = document.getElementById("decklist-scrollbox");

const btns = document.querySelectorAll('button');
for (let i of btns){
    i.addEventListener('click', function(){
        if(this.id === 'copy'){
            navigator.clipboard.writeText(document.getElementById("decklist-scrollbox").textContent);
        }
        if(this.id === 'clear'){
            chrome.runtime.sendMessage({action:'clear_storage'});
            updateTextBox("", textbox);
        }
    });
}

window.onload = function() {
    try{
        chrome.storage.local.get("global_list", function(items){
            if(items.global_list.length > 0){
                updateTextBox(items.global_list, textbox);
            }
        });
    } catch (error){
        console.log("error", error);
    }
}