import { addEchoMessage, getEchoMessages, deleteEchoMessage } from '@/models/echo';

export const getEchoMessage = async () => {
  return await getEchoMessages();
};

export const echo = async (text: string, message: string) => {
  if (text && message) {
    return await addEchoMessage(text, message);
  }
};

export const removeMessage = async (text: string) => {
  if (text) {
    await deleteEchoMessage(text);
  }
};

export const echoMessage = async (text: string) => {
  const messages = await getEchoMessages();

  messages.sort(() => 0.5 - Math.random());
  messages.sort((a, b) => b.text.length - a.text.length);

  for (const message of messages) {
    if (text.includes(message.text)) {
      const matchCount = text.match(new RegExp(message.text, 'g')).length;

      return Array.from(Array(matchCount).keys())
        .map(() => message.message)
        .join(' ');
    }
  }
};
