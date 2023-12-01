const search_grid = document.querySelector(".card-grid-inner");
if (search_grid){
    const card_results = search_grid.querySelectorAll(".card-grid-item");
    card_results.forEach((card) => {
        var button = document.createElement("button");
        button.className += 'h-button';
        button.title = "Add to list";
        button.innerText = "+";
        var i_title = document.createElement("span");
        i_title.className += 'i-title';
        i_title.innerText = card.querySelector(".card-grid-item-invisible-label").textContent

        card.appendChild(button).appendChild(i_title);

        button.addEventListener("click", function(){
            card_name = this.querySelector("span").innerText;
            var response = chrome.runtime.sendMessage({action:'update_storage',action_data:card_name});
        });
    });
}


const single_grid = document.querySelector(".card-image");
if(single_grid){
    const single_title = document.head.querySelector("meta[property='og:title']").content;
    var button = document.createElement("button");
    button.className += 'h-button';
    button.title = "Add to list";
    button.innerText = "+";
    var i_title = document.createElement("span");
    i_title.className += 'i-title';
    i_title.innerText = single_title;

    single_grid.appendChild(button).appendChild(i_title);

    button.addEventListener("click", function(){
        card_name = this.querySelector("span").innerText;
        var response = chrome.runtime.sendMessage({action:'update_storage',action_data:card_name});
    });
}