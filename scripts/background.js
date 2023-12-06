chrome.runtime.onInstalled.addListener((details) => {
    try{
        let current_list = chrome.storage.local.get("global_list");
    } catch (e){
        console.log("no storage. creating");
        chrome.storage.local.set({global_list:[]});
    }
})

chrome.runtime.onMessage.addListener((response, sender, sendReponse) => {
    if (response.action === 'update_storage'){
        chrome.storage.local.get("global_list", function(items){
            let current_list = items.global_list;
            current_list.push(response.action_data);
            chrome.storage.local.set({global_list:current_list});
        });
    } else if (response.action === 'clear_storage'){
        chrome.storage.local.set({global_list:[]});
    } else if (response.action === 'decrease_storage'){
        chrome.storage.local.get("global_list", function(items){
            let current_list = items.global_list;
            current_list.splice(current_list.indexOf(response.action_data),1);
            chrome.storage.local.set({global_list:current_list});
        });
    } else if (response.action === 'remove_storage'){
        chrome.storage.local.get("global_list", function(items){
            console.log("removing: ", response.action_data, "from: ", items);
            let current_list = items.global_list.filter(a => a !== response.action_data);
            console.log("new list: ", current_list);
            chrome.storage.local.set({global_list:current_list});
        });
    }
});
