import sequelize, { Sequelize } from "sequelize";
import { Message } from "../models/messageModel.js";
import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export class MessagesService {
  async listAll() {
    return Message.findAll();
  }

  async createAndReply(userText) {
    const resp = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userText }],
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
      return "Oops! We're having a little server issue right now. Please try again in a few moments or call us. Thanks for your patience!";
    }

    return botText;
  }
}
