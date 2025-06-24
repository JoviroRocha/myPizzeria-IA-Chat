import { MessagesService } from "../services/messageService.js";

const svc = new MessagesService();

export async function postMessage(req, res) {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is mandatory!" });
  const botMsg = await svc.createAndReply(message);
  res.status(200).json(botMsg);
}

export async function getMessages(_, res) {
  const history = await svc.listAll();
  res.status(200).json(history);
}
