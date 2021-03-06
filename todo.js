const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

let toDos = [];

function deleteAllData() {
  const deleteMessage = confirm("모든 데이터를 삭제할래요?ㅠㅠ");
  if (deleteMessage) {
    localStorage.clear();
    const cleanToDoAll = toDos.filter(function(toDo) {
      return 0;
    });
    toDos = cleanToDoAll;
    saveToDos();

    history.go(0);
  } else {

  }

}

function deleteToDO(event){
  const btn = event.target;
  const li = btn.parentNode;
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo) {
    return toDo.id !== parseInt(li.id);
  });
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length + 1 ;

    delBtn.style.color = 'red';
    delBtn.style.background = 'none';
    delBtn.style.border = 'none';
    delBtn.style.fontSize = '100%';
    delBtn.innerText = "X";
    delBtn.addEventListener("click", deleteToDO);
    span.innerText = text;
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id = newId;
    toDoList.appendChild(li);
    const toDoObj = {
      text: text,
      id: newId
    };
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos !== null){
      const parsedTodDos = JSON.parse(loadedToDos);
      parsedTodDos.forEach(function(toDo){
        paintToDo(toDo.text);
      });
    }
}
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
}

init();
