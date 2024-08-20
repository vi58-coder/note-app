const btnEl = document.getElementById("btn")
const appEl = document.getElementById("app")

getNotes().forEach((note) => {
    const noteEl = creatNoteEl(note.id, note.content)
    appEl.insertBefore(noteEl, btnEl)
});

function creatNoteEl(id, content) {
    const element = document.createElement("textarea")
    element.classList.add("note")
    element.placeholder = "Empty Note"
    element.value = content

    element.addEventListener("dblclick", () => {
        const warning = confirm("Do u want to delete this?")
        if (warning) {
            deleteNote(id, element)
        }
    })

    element.addEventListener("input", () => {
        updateNote(id, element.value)
    })

    return element;
}

function deleteNote(id, element) {
    const notes = getNotes().filter((note) => note.id != id)
    saveNote(notes)
    appEl.removeChild(element)
}

function updateNote(id, content) {
    const notes = getNotes()
    const target = notes.filter((note) => note.id == id)[0];
    target.content = content;
    saveNote(notes);
}

function addNote() {
    const notes = getNotes();
    const noteObj = {
        id: Math.floor(Math.random() * 10000),
        content: "",
    };
    const noteEl = creatNoteEl(noteObj.id, noteObj.content);
    appEl.insertBefore(noteEl, btnEl);
    notes.push(noteObj);
    saveNote(notes);
}

function saveNote(notes) {
    localStorage.setItem("notes", JSON.stringify(notes));
}

function getNotes() {
    return JSON.parse(localStorage.getItem("notes") || "[]");
}

btnEl.addEventListener("click", addNote);