class Message {
    static logList = [];
    constructor(author, content) {
        this.author = author + ": ";
        this.content = content;
    }
    add() {
        if (!Message.logList.includes(this)){
            Message.logList.push(this);
        }
    }
}

export function log(author, content) {
new Message(author, content).add();
}

export function getLogHistory() {
    return Message.logList;
}