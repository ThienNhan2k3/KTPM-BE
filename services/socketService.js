
const rooms = {};

function askNewQuestion(room) {
    if (rooms[room].players.length === 0) {
      clearTimeout(rooms[room].questionTimeout);
      delete rooms[room];
      return;
    }
  
    const question = questions[questions.length - count];
    const title = question.title;
    const answers = question.answers;
    const correctIndex = question.correctIndex;
    count -= 1;

    rooms[room].currentQuestion = title;
    
    rooms[room].correctAnswer = answers[correctIndex];
    
    rooms[room].shouldAskNewQuestion = true;
    console.log(count);
    io.to(room).emit("newQuestion", {
      question: title,
      answers: answers,
      timer: 10,
    });
    console.log("emit newQuestion");
  
    rooms[room].questionTimeout = setTimeout(() => {
        io.to(room).emit("answerResult", {
            correctAnswer: rooms[room].correctAnswer,
            scores: rooms[room].players.map((player) => ({
            name: player.name,
            score: player.score || 0,
            }))
        });

        setTimeout(() => {
            if (count > 1) {
                askNewQuestion(room);
            } else {
            delete rooms[room];
            io.to(room).emit("gameOver", "end")
            }
        }, 2000);
      
    }, 10000);
}


class SocketService {

    connection( socket ) {

        socket.on("disconnect", () => {
            console.log(">>>User disconnect id is ", socket.id)
        })

        //event on here

        socket.on("joinRoom", (room, name) => {
            socket.join(room);
            console.log(`${name} has joined the game!`);
            io.to(room).emit("message", `${name} has joined the game!`);
            if (!rooms[room]) {
              rooms[room] = {
                players: [],
                currentQuestion: null,
                correctAnswer: null,
                questionTimeout: null,
                shouldAskNewQuestion: true,
              };
            }
            console.log("rooms:::", rooms);
            console.log("players:::", rooms[room].players);
            
            rooms[room].players.push({ id: socket.id, name });
        
            if (!rooms[room].currentQuestion) {
              askNewQuestion(room);
            }
          });
        
          socket.on("submitAnswer", (room, answers) => {
      
            console.log("room:::", rooms[room]);
            console.log("submitAnswer:::", answers);
            const currentPlayer = rooms[room].players.find(
              (player) => player.id === socket.id
            );
        
            if (currentPlayer) {
              const correctAnswer = rooms[room].correctAnswer;
              const isCorrect = correctAnswer !== null && correctAnswer == answers;
              currentPlayer.score = isCorrect
                ? (currentPlayer.score || 0) + 1
                : (currentPlayer.score || 0) - 1;
            }
          });
        
          socket.on("disconnect", () => {
            for (const room in rooms) {
              rooms[room].players = rooms[room].players.filter(
                (player) => player.id !== socket.id
              );
            }
        
            console.log("A user disconnected");
          });
    }
}

module.exports = new SocketService();