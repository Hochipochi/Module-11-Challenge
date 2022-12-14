const util = require('util');
const fs = require('fs');

//this package will be used to generate our unique ids
const { v4: uuidv4 } = require('uuid');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
    read() {
        return readFileAsync('./db/db.json', 'utf8');
    }

    write(note) {
        return writeFileAsync('./db/db.json', JSON.stringify(note));
    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            //if notes isn't an array or can't be turned into one, send back a new empty array
            try {
                parsedNotes = [].concat(JSON.parse(notes));
            } catch (err) {
                parsedNotes = [];
            }

            return parsedNotes;
        });
    }

    addNote(note) {
        const { title, text } = note;

        if (!title || !text) {
            throw new Error('Note "title" and "text" cannot be blank');
        }

        //add a unique id to the note using uuid package
        const newNote = { title, text, id: uuidv4() };

        //get all notes, add the new note, write all the updated notes, return the newNote
        return this.getNotes()
            .then((notes) => [...notes, newNote])
            .then((updatedNotes) => notes.filter((note) => note.id !== id))
            .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Store();