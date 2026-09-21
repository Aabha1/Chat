module.exports = (io) => {
  io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
      global.onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", ({ to, message }) => {
      const recipientSocket = global.onlineUsers.get(to);
      if (recipientSocket) {
        socket.to(recipientSocket).emit("msg-receive", message);
      }
    });
  });
};
