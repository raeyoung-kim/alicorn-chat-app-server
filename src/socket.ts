import Chat from './models/Chat';

export default function socket(io: any) {
  io.on('connection', (socket: any) => {
    socket.on('join', async ({ id }: any) => {
      let chatId = id;
      const newChatId = id.split('-').reverse().join('-');
      let chatList = await Chat.find({ chatId: chatId });

      if (!chatList?.length) {
        chatList = await Chat.find({ chatId: newChatId });
        if (chatList) {
          chatId = newChatId;
        }
      }

      if (chatList?.length) {
        io.emit('message', { chatList, chatId });
      }

      socket.join(chatId);
    });

    socket.on('sendMessage', async (chatData: any, callback: () => void) => {
      await Chat.create(chatData);
      const result = await Chat.find({ chatId: chatData.chatId });

      io.emit('message', result);
      callback();
    });

    socket.on('disconnect', () => {
      console.log('disconnect!');
    });
  });
}
