const qrcode = require("qrcode-terminal");
const fs = require("fs");
const { Client, LegacySessionAuth } = require("whatsapp-web.js");

const SESSION_FILE_PATH = "./session.json";

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
  sessionData = require(SESSION_FILE_PATH);
}

const client = new Client({
  authStrategy: new LegacySessionAuth({
    session: sessionData,
  }),
});

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("authenticated", (session) => {
  sessionData = session;
  fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
    if (err) {
      console.error("error", err);
    }
  });
});

client.on("ready", () => {
  console.log("Client is ready!");
  client.getChats().then((chats) => {
    myConversation = chats.find((chat) => chat.id.user === "8801781865066");
    for (let i = 0; i < 9999; i++) {
      setTimeout(() => {
        client.sendMessage(myConversation.id._serialized, " Khala ");
        console.log("sent successfully");
      }, i * 5000);
    }
    console.log(myConversation);
  });
});

client.initialize();
