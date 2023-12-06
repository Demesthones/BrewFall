chrome.runtime.onInstalled.addListener((details) => {
    let current_list = [];
    try{
        current_list = chrome.storage.local.get(["global_list"]);
    } catch (e){
        console.log("no storage. creating");
        chrome.storage.local.set({global_list:[]});
    }
})

chrome.runtime.onMessage.addListener((response, sender, sendReponse) => {
    let current_list = [];
    try{
        chrome.storage.local.get(["global_list"]).then((result) => {
            if(result.global_list != undefined){
                current_list = result.global_list;
            }
            if (response.action === 'update_storage'){
                current_list.push(response.action_data);
            } else if (response.action === 'clear_storage'){
                current_list = []
            } else if (response.action === 'decrease_storage'){
                current_list.splice(current_list.indexOf(response.action_data),1);
            } else if (response.action === 'remove_storage'){
                current_list = result.global_list.filter(a => a !== response.action_data);
            }
            chrome.storage.local.set({global_list:current_list});
        });
    } catch(e){
        console.log(e);
    }
});
