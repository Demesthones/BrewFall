const scrollbox = document.getElementById("decklist-scrollbox");

const addListener = function(){
    chrome.storage.onChanged.addListener((changes, namespace) => {
        for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
            let target = scrollbox;
            const template = document.querySelector("#row-item");
            if (newValue === ""){
                target.textContent = "";
            } else {
                target.textContent = "";
                let current_list = newValue.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
                for(const n in current_list){
                    let clone = template.content.cloneNode(true);
                    let cba = clone.querySelector(".card-box-amount");
                    let cbn = clone.querySelector(".card-box-name");

                    cba.textContent = `${current_list[n]} `;
                    cbn.textContent = `${n}`;
                    target.appendChild(clone);
                };
            }
            let cnb = scrollbox.querySelectorAll("button");
            for (let i of cnb){
                i.addEventListener('click', function(){
                    if(this.className === 'button-remove-amount'){
                        chrome.runtime.sendMessage({action:'decrease_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                    }
                    if(this.className === 'button-add-amount'){
                        chrome.runtime.sendMessage({action:'update_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                    }
                    if(this.className === 'button-delete-row'){
                        chrome.runtime.sendMessage({action:'remove_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                    }
                });
            }
        }
    });
}
addListener();


function updateScrollBox() {
    chrome.storage.local.get(["global_list"]).then((result) => {
        console.log(result.global_list);
        let target = scrollbox;
        const template = document.querySelector("#row-item");
        if (result === ""){
            target.textContent = "";
        } else {
            target.textContent = "";
            let current_list = result.global_list.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
            for(const n in current_list){
                let clone = template.content.cloneNode(true);
                let cba = clone.querySelector(".card-box-amount");
                let cbn = clone.querySelector(".card-box-name");
    
                cba.textContent = `${current_list[n]} `;
                cbn.textContent = `${n}`;
                target.appendChild(clone);
            };
        }
        let cnb = scrollbox.querySelectorAll("button");
        for (let i of cnb){
            i.addEventListener('click', function(){
                if(this.className === 'button-remove-amount'){
                    chrome.runtime.sendMessage({action:'decrease_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                }
                if(this.className === 'button-add-amount'){
                    chrome.runtime.sendMessage({action:'update_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                }
                if(this.className === 'button-delete-row'){
                    chrome.runtime.sendMessage({action:'remove_storage',action_data:this.parentElement.parentElement.querySelector(".card-box-name").textContent});
                }
            });
        }
    });
}

const btns = document.querySelectorAll('button');
for (let i of btns){
    i.addEventListener('click', function(){
        if(this.id === 'copy'){
            chrome.storage.local.get(["global_list"]).then((result) => {
                //console.log(content);
                let content = result.global_list.reduce((cnt, cur) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});
                let cb = "";
                for(const n in content){
                    cb += `${content[n]}  ${n}\n`;
                }
                //console.log(cb);
                navigator.clipboard.writeText(cb);
            });
        }
        if(this.id === 'clear'){
            chrome.runtime.sendMessage({action:'clear_storage'});
        }
    });
}

window.onload = function(){
    updateScrollBox();
}