chrome.runtime.onMessage.addListener((response, sender, sendReponse) => {
    if (response.action === 'update_storage'){
        chrome.storage.local.get("global_list", function(items){
            let current_list = items.global_list;
            current_list.push(response.action_data);
            chrome.storage.local.set({global_list:current_list});
        });
    } else if (response.action === 'clear_storage'){
        chrome.storage.local.set({global_list:[]});
        console.log("storage clear sent. current storage: ", chrome.storage.local.get("global_list"));
    }
});
