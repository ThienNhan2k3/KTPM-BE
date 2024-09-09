const redis = require('../redis/redisDB');
const { Quiz, Question } = require('../models');
const UserService = require('./userService');
const EventService = require('./eventService');
const uuid = require("uuid");
const VoucherService = require('./voucherService');

function emitQuestion(io, eventId, title, question, timer) {
  io.to(eventId).emit(title, {
    ques: question.ques,
    choice_1: question.choice_1,
    choice_2: question.choice_2,
    choice_3: question.choice_3,
    choice_4: question.choice_4,
    timer,
  });
}

async function emitAnswer(io, eventId, userId, correctAnswer) {
  // Cập nhật lại điểm của người chơi
  const AllScores = await redis.hgetall(`eventQuizes:${eventId}:players`);
  const playerScore = await redis.hget(`eventQuizes:${eventId}:players`, userId);    
  const answerObject = {
    correctAnswer,
    AllScores,
    playerScore
  }
  io.to(eventId).emit("answerOfQuestion", answerObject)
}

async function emitEventEnd(io, eventId, userId) {
  // const vouchers = await VoucherService.findVouchersByEventId(eventId);

  const allPlayerScore = await redis.hgetall(`eventQuizes:${eventId}:players`);
  // const sortable = Object.entries(allPlayerScore)
  //   .sort(([,a],[,b]) => a-b)
  //   .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  
  // for (let key of sortable.keys()) {
  //   console.log(key);
  //   // VoucherService.setVoucherToUser(key); 
  // }

  // vouchers.sort(function(a, b) {
  //   return b["value"] - a["value"];
  // });

  console.log(allPlayerScore)

  io.to(eventId).emit("eventEnd", {
    allPlayerScore,
    voucher: "Voucher 50%"
  })
}

async function updateNewQuestionToDb(eventId, newQuestion) {
  //Cập nhật lại câu hỏi hiện tại trong danh sách các câu hỏi vào Redis DB
  await redis.hset(`eventQuizes:${eventId}:currentQuestion`, newQuestion);
  await redis.incr(`eventQuizes:${eventId}:questionIndex`);
}

async function askQuestion(io, eventId, userId, timer) {
  //Lấy câu hỏi hiện tại của event từ Redis DB
  const question = await redis.hgetall(`eventQuizes:${eventId}:currentQuestion`);  
  emitQuestion(io, eventId, "question", question, timer);

  let endTime =  new Date(Date.now() + SocketService.timer * 1000);
  await redis.hset(`eventQuizes:${eventId}:currentQuestion`, "endTime", endTime);  
  
  const correctAnswer = question[`choice_${question.answer}`];
  //Lấy toàn bộ câu hỏi của event vào Redis DB
  const questions = JSON.parse(await redis.get(`eventQuizes:${eventId}:questions`));
  //Lấy vị trí của câu hỏi hiện tại trong danh sách các câu hỏi vào Redis DB
  const questionIndex = Number(await redis.get(`eventQuizes:${eventId}:questionIndex`));

  const isContinuous =  questionIndex + 1 < questions.length;
  const newQuestion = isContinuous ? {
    ques: questions[questionIndex + 1].ques,
    choice_1: questions[questionIndex + 1].choice_1,
    choice_2: questions[questionIndex + 1].choice_2,
    choice_3: questions[questionIndex + 1].choice_3,
    choice_4: questions[questionIndex + 1].choice_4,
    answer: questions[questionIndex + 1].answer,
    endTime: new Date(Date.now() + (SocketService.timer * 2 + 2) * 1000) // Phải chờ ít nhất 12s sau thì câu hỏi tiếp theo mới đc hỏi vì vậy thời gian end = 10s (trả lời) + 12s (delay)
  } : null;


  setTimeout(async (io, eventId, userId, correctAnswer, isContinuous, newQuestion) => {
    // Cập nhật lại điểm của người chơi
    await emitAnswer(io, eventId, userId, correctAnswer);

    if (isContinuous) {
      //Cập nhật lại câu hỏi hiện tại trong danh sách các câu hỏi vào Redis DB
      await updateNewQuestionToDb(eventId, newQuestion);
    
      setTimeout(async (io, eventId, userId) => {
        askQuestion(io, eventId, userId, timer);
      }, 2 * 1000, io, eventId, userId);
      
    } else {
      setTimeout(async () => {
        await emitEventEnd(io, eventId, userId);

        //Set voucher cho người chơi tương ứng trong SQL
        //Code here
      }, 2 * 1000);

    }
  }, timer * 1000, io, eventId, userId, correctAnswer, isContinuous, newQuestion);
}



class SocketService {
  static timer = 10; //Được tính theo giây
  
  static connection( socket ) {
    console.log("User connection id is ", socket.id);

    socket.on("disconnect", () => {
        console.log(">>>User disconnect id is ", socket.id)
    })
    


    //event on here
    socket.on("playEvent", async (eventId, userId) => {
      if (!uuid.validate(eventId) || !uuid.validate(userId)) {
        socket.disconnect();
        return;
      }

      const event = await EventService.findQuizById(eventId);
      const currentDate = new Date().setHours(0, 0, 0, 0);
      const eventStartDate = new Date(event.start_time).setHours(0, 0, 0, 0);
      const eventEndDate = new Date(event.end_time).setHours(0, 0, 0, 0);
      
      if (!event || currentDate < eventStartDate || currentDate > eventEndDate) {
        socket.disconnect();
        return;
      }

      const player = await UserService.findPlayerWithTicketOfEventById(userId, eventId);
      // if (!player || (!player.User_Events && player.User_Events.length > 0 && player.User_Events[0].playthrough <= 0)) {
      //   socket.disconnect();
      //   return;
      // }

      // //Bỏ đi một ticket của người chơi
      // player.User_Events[0].playthrough -= 1;
      // // console.log("ticket:::", player.User_Events[0].playthrough);
      // await player.User_Events[0].save();


      
      socket.join(eventId);
      console.log(`${userId} has joined the game!`);
      __io.to(eventId).emit("message", `${userId} has joined the game!`);
      
      //Lưu eventId mà user đang tham gia vào Redis DB
      await redis.set(`player:${userId}`, eventId);
      
      //Kiểm tra xam sự kiện đã bắt đầu hay chưa
      let eventQuizes = await redis.get(`eventQuizes:${eventId}:questions`);

      let question = null;
      // console.log("eventQuizes:::", eventQuizes);
      if (eventQuizes != null) {
        const tempEventQuizes = JSON.parse(eventQuizes);
        const questionIndex = Number(await redis.get(`eventQuizes:${eventId}:questionIndex`));

        if (questionIndex + 1 >= tempEventQuizes.length) {
          socket.disconnect();
        }
      }
      else { //Sự kiện chưa bắt đầu
        //Lấy ra danh sách câu hỏi
        const quiz = await Quiz.findOne({
          where: { 
              id_event: eventId
            },
        });
        if (quiz == null) return;
        const questions = await Question.findAll({
          where: { id_quiz: quiz.id },
        });
        
        const intialIndex = 0;
        //Lưu toàn bộ câu hỏi của event vào Redis DB
        await redis.set(`eventQuizes:${eventId}:questions`, JSON.stringify(questions));
        //Lưu vị trí của câu hỏi hiện tại trong danh sách các câu hỏi vào Redis DB
        await redis.set(`eventQuizes:${eventId}:questionIndex`, intialIndex);

        question = questions[intialIndex];
        
        //Lưu câu hỏi hiện tại trong danh sách các câu hỏi vào Redis DB
        await redis.hset(`eventQuizes:${eventId}:currentQuestion`, {
          ques: question.ques,
          choice_1: question.choice_1,
          choice_2: question.choice_2,
          choice_3: question.choice_3,
          choice_4: question.choice_4,
          answer: question.answer,
        });

      }

      //Lưu danh sách người chơi và điểm số của họ vào Redis DB
      await redis.hset(`eventQuizes:${eventId}:players`, userId, 0);
  
      if (question != null && question.ques) {
        if (!eventQuizes) {
          let countDown = 10;

          while (countDown >= 1){
            setTimeout(function(countDown){
              __io.to(eventId).emit("eventStart", countDown)
            }, (10 - countDown) * 1000, countDown);
            countDown -= 1;
          }

          setTimeout((__io, eventId, userId, timer) => {
            askQuestion(__io, eventId, userId, timer);
          }, 11 * 1000, __io, eventId, userId, SocketService.timer);
        } else {
          askQuestion(__io, eventId, userId, SocketService.timer);
        }
        
      }
    });
        
    socket.on("submitAnswer", async (userId, answer) => {
      if (!uuid.validate(userId)) {
        return;
      }
      //Lấy ra eventId từ userId 
      const eventId = await redis.get(`player:${userId}`);

      if (eventId != null) {
        //Lấy câu hỏi hiện tại của event vào Redis DB
        const question = await redis.hgetall(`eventQuizes:${eventId}:currentQuestion`);
        const correctAnswer = question[`choice_${question.answer}`];
        const isCorrect = correctAnswer != null && correctAnswer == answer;

        if (isCorrect) {
          let remainingTime = (new Date(question.endTime) - Date.now()) / 1000;
          remainingTime = remainingTime > 0 ? Math.round(remainingTime) : 0;
          
          // Cập nhật lại điểm của người chơi
          await redis.hincrby(`eventQuizes:${eventId}:players`, userId, remainingTime * 10);
          const point = await redis.hget(`eventQuizes:c4fb5c4d-4ef7-4c43-b978-4bfab379dce1:players`, 'nhan');
        }
      }
    });   
  }

}

module.exports = SocketService;