
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


#### Play lac xi 

```http
  GET /event/lacxi/:uuid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:uuid`    | `uuid`   | **Required**. Id of the event that users want to play |


##### Output 

```http
  {
    "code": 200,
    "item": {
        "id": "c4fb5c4d-4ef7-4c43-b978-4bfab379dce3",
        "id_event": "c4fb5c4d-4ef7-4c43-b978-4bfab379dce2",
        "quantity": 100,
        "name": "Item 3",
        "image": "/public/images/c4fb5c4d-4ef7-4c43-b978-4bfab379dce2/C.png",
        "time_update": "2024-09-03T10:55:11.346Z"
    }
  }
```


#### Redeem voucher 

```http
  GET /event/lacxi/:uuid/redeem
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:uuid`    | `uuid`   | **Required**. Id of the event that users want to play |


##### Output 

```http
  {
  "code": 200,
    "item": {
        "voucher_code": "1pJGqsck9YHNQdWF0u8M",
        "id_brand": "05e44252-ff08-4a0a-b238-93cf3c5382a0",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVby3iOTFYXKAJcotTkoXILVhrhY4lxwW0B7c2aspC1f24Iho4nknAAsXmSQ4ZwL9eYAA&usqp=CAU",
        "value": 62,
        "max_discount": 7784000,
        "description": "Vomito universe aufero vinco deludo sit adduco vulgus. Provident ascit vester argumentum templum.",
        "status": "Active",
        "time_update": "2024-08-24T00:15:53.729Z",
        "Voucher_In_Events": [
            {
                "id": "0665b99d-13f5-48a5-a416-14b43b47d693",
                "id_voucher_code": "1pJGqsck9YHNQdWF0u8M",
                "id_event": "c4fb5c4d-4ef7-4c43-b978-4bfab379dce2",
                "exp_date": "2024-10-24",
                "total_quantity": "49",
                "time_update": null
            }
        ]
    }
}
```


#### Share event on Facebook

```http
  GET /event/share/:uuid
```
| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `:uuid`    | `uuid`   | **Required**. Id of the event that users want to redeem |


##### Output 

```http
{
    "code": 200,
    "message": "Thêm ticket thành công"
}
```




