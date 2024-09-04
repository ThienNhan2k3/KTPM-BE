
# VOU Backend

## Websocket Reference

#### Connect to the Websocket

```http
  mSocket = IO.socket("http://localhost:5000")
```

#### Players join a event room
```http
  socket.emit("playEvent", eventId, userId)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `eventId` | `uuid`   | **Required**. Id of the event that users want to play |
| `userId` | `uuid`   | **Required**. Id of users want to play |


#### Players submit an answer

```http
    socket.emit('submitAnswer', userId, answer);
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `userId` | `uuid`   | **Required**. Id of users  |
| `answer` | `uuid`   | **Required**. The selected answer |


#### Players receive a question from server
```http
  socket.on("question", function(data) {
    //This is the structure of data variable
    data = {
        ques, // question
        choice_1, // Answer A
        choice_2, // Answer B
        choice_3, // Answer C
        choice_4, // Answer D
        timer // Time to answer
    }
  })
  
}


```


#### Players receive the answer of the previous question and  Each  participant's score
```http
  socket.on("answerOfQuestion", function(data) {
    // data variable has object type 
    //This is the structure of data variable
    data = {
        correctAnswer, // the correct answer of the question
        AllScores, // Each  participant's score
    }
  })
  
}
```


#### Players receive the remaining time before the game is starting
```http
  socket.on("eventStart", function(countDown) {
    // countDown variable has integer type 
  })
  
}
```

#### Players receive the notification that event was end
```http
  socket.on("eventEnd", function(data) {
    // data variable has object type 
    //This is the structure of data variable
    data = {
        playerScore, //
        voucher //voucher
    } 
    
  })
  
}
```


#### Players didn't qualify for joining the event 
```http
  socket.on("disconnect", function() {
  })
}
```

## API Reference

#### Get all events

```http
  GET /event/getAll
```

##### Output 

```http
  {
    id: uuid,
    type: string,
    name: string,
    image: string,
    start_time: time,
    end_time: time,
    id_brand: uuid
  }
```



