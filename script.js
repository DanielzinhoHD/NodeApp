const btnAdd = document.querySelector(".btn-add");
let text = [];
let data = JSON.parse(localStorage.getItem("notes"));

if(!data){
    addNote('Example note', true, true, false);
    const textarea = document.querySelector("textarea");
    text.push(textarea.value);
    localStorage.setItem("notes", JSON.stringify(data));
}

console.log(data);

function saveLS(content){
    const textarea = content.querySelector("textarea");
    text.push(textarea.value);
    localStorage.setItem("notes", JSON.stringify(text));
}

function removeFromLS(content){
    const textarea = content.querySelector("textarea"); 
    const index = text.indexOf(textarea.value);
    text.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(text));
}

if(data){
    
    data.forEach((txt) => {
        addNote(txt, true, true, false)
        text.push(txt)
    })
}

btnAdd.addEventListener("click", () => {
    addNote('', false, false, true);
})

function addNote(text = '', readonly = false, square = false, clicked = false){
    // Setando estado da aparência da note quando carregado do LS
    let classReadonly = '';
    let classSquare = '';
    let classClicked = '';
    if(readonly){
        classReadonly = 'readonly'
    }
    if(square){
        classSquare = 'not-writing'
    }else{
        classSquare = 'writing';
    }
    if(!clicked){
        classClicked = 'unclicked'
    }else{
        classClicked = 'clicked'
    }

    const content = document.createElement("div");
    content.innerHTML = `
    <div class="main-container">
        <div class="tab-container">
            <ul>
                <li><button class="settings unclicked"><i class="fas fa-cog"></i></button></li>
                <li><button class="edit ${classClicked}"><i class="fas fa-pen"></i></button></li>
                <li><button class="close unclicked"><i class="fas fa-times"></i></button></li>
            </ul>
        </div>
        <div class="body-container">
            <div class="square ${classSquare}">
                <textarea ${classReadonly} class="text-area" cols="30" rows="10" placeholder="Write it here...">${text}</textarea>
            </div>
        </div>
    </div>`
    document.body.appendChild(content);

    const btnClose = content.querySelector(".close");
    const btnEdit = content.querySelector(".edit");
    const textArea = content.querySelector(".text-area");
    const btnSett = content.querySelector(".settings");
    const squareEl = content.querySelector(".square");
    textArea.focus();


    // Botão de edição
    btnEdit.addEventListener("click", () => {
        textArea.toggleAttribute("readonly");

        // Escrevendo
        if(btnEdit.classList.contains("unclicked")){
            btnEdit.classList.remove("unclicked");
            btnEdit.classList.add("clicked");
            squareEl.classList.remove("not-writing");
            squareEl.classList.add("writing");
            textArea.focus();
            
            // Apagar LS
            removeFromLS(content);
        }
        // Não escrevendo
        else{
            btnEdit.classList.remove("clicked");
            btnEdit.classList.add("unclicked");
            squareEl.classList.remove("writing");
            squareEl.classList.add("not-writing");

            // Salvar LS
            saveLS(content);
        }
    })

    // Botão de fechar janela
    btnClose.addEventListener("click", () => {
        content.remove();
        removeFromLS(content);
    })

    btnSett.addEventListener("click", () => {
        alert("Sorry, but this button does nothing xP");
    })
}
