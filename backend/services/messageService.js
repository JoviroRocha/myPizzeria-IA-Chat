import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { Message } from "../models/messageModel.js";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export class MessagesService {
  constructor() {
    this.promptTemplate = null;
    this._initPrompt();
  }

  async _initPrompt() {
    this.promptTemplate = await createPrompt();
  }

  async listAll() {
    return Message.findAll();
  }

  async createAndReply(userText) {
    if (!this.promptTemplate) {
      await this._initPrompt();
    }

    const prompt = [this.promptTemplate.trim(), "CUSTOMER_MESSAGE:", userText].join("\n\n");

    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const botText =
      resp.choices[0].message?.content ??
      "Sorry! I don't understand. Can you ask again, please? Thank you for your patience!";

    try {
      await Message.sequelize.transaction(async (t) => {
        await Message.create({ content: userText, sentBy: "user" }, { transaction: t });
        await Message.create({ content: botText, sentBy: "agent" }, { transaction: t });

        console.log("Created user and agent message records!");
      });
    } catch (error) {
      console.error("Error creating records: ", error);
      return "Sorry, I'm unable to answer your question right now. Please try asking a simpler question or try again in a few moments. You can also reach us by phone. Thank you for your patience!";
    }

    return botText;
  }
}

async function createPrompt() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const promptInstructions = await fs.readFile(path.join(__dirname, "../constants/promptTemplate.txt"), "utf8");

  const menuJSON = await fs.readFile(path.join(__dirname, "../constants/menu.json"), "utf8");
  const menuObj = JSON.parse(menuJSON);

  let menuText = "MENU:\n";
  for (const [category, items] of Object.entries(menuObj)) {
    menuText += `${category}:\n`;
    for (const [name, price] of Object.entries(items)) {
      menuText += `  • ${name} – ${price}\n`;
    }
    menuText += "\n";
  }

  return [promptInstructions.trim(), "----------", menuText.trim()].join("\n\n");
}
