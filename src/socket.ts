import Chat from './models/Chat';

export async function getMessageList(chatUser: string) {
  const users = await (
    await Chat.find({ chatId: new RegExp(`${chatUser}`, 'i') })
  ).reverse();

  const result = users.filter((item, i) => {
    return (
      users.findIndex((item2, j) => {
        return item.chatId === item2.chatId;
      }) === i
    );
  });

  return result;
}

export default function socket(io: any) {
  io.on('connection', (socket: any) => {
    socket.on('join', async ({ id }: any) => {
      let chatId = id;
      const newChatId = id?.split('-').reverse().join('-');
      let chatList = await Chat.find({ chatId: chatId });

      if (!chatList?.length) {
        chatList = await Chat.find({ chatId: newChatId });
        if (chatList) {
          chatId = newChatId;
        }
      }

      if (chatList?.length) {
        socket.join(chatId);
      } else {
        socket.join(id);
      }

      io.to(chatId).emit('message', { chatList, chatId });
    });

    socket.on('messageList', async ({ id }: any) => {
      if (id) {
        const result = await getMessageList(id);
        socket.join(id);
        io.to(id).emit('message_list', result);
      }
    });

    socket.on('sendMessage', async (chatData: any, callback: () => void) => {
      await Chat.create(chatData);
      const result = await Chat.find({ chatId: chatData.chatId });

      const users = chatData.chatId.split('-');

      const result1 = await getMessageList(users[0]);
      const result2 = await getMessageList(users[1]);

      io.to(chatData.chatId).emit('message', {
        chatList: result,
        chatId: chatData.chatId,
      });

      io.to(`${users[0]}`).emit('message_list', result1);
      io.to(`${users[1]}`).emit('message_list', result2);

      callback();
    });

    socket.on('disconnect', () => {
      console.log('disconnect!');
    });
  });
}
