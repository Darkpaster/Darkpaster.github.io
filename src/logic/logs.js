class Message {
    static logList = [];
    constructor(author, content) {
        this.author = author + ": ";
        this.content = content;
    }
    add(color) {
        this.color = color;
        if (!Message.logList.includes(this)){
            Message.logList.push(this);
        }
    }
}

export function log(author, content, color = "white") {
new Message(author, content).add(color);
}

export function getLogHistory() {
    return Message.logList;
}