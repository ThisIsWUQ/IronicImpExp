PennController.ResetPrefix()

// Turn off debugger
DebugOff()

//Sequence 
// 1) Consent Form 
// 2) Participant's information 
// 3) Instructions 
// 4) Exercise 
//      4.1 Test (Demo)  
//      4.2 Fillers (Prompt) 
// 5) Actual Test
//      5.1 Test
//      5.2 Fillers
// 6) End Screen

Sequence("consent", "information","instructions", shuffle(randomize("FillersPrompt"), randomize("TestDemo")), shuffle(randomize("Test"), randomize("Fillers")), "send", "completion_screen")

// 1) Consent Form
newTrial("consent",
    newHtml("consent_form", "consent.html") // display the agreement (as .html file) on the screen
        .cssContainer({"width":"720px"})
        .center()
        .checkboxWarning("ท่านต้องแสดงความยินยอมก่อนไปหน้าถัดไป") // after reading the agreement, participants must check the box (agree to do the test) to continue the experiment
        .print()
    ,
    newButton("continue", "คลิกที่นี่ เพื่อไปหน้าถัดไป") // create a button for going to the next page
        .center()
        .print()
        .wait(getHtml("consent_form").test.complete()
                  .failure(getHtml("consent_form").warn())
        )
)

// 2) Participant's Information
newTrial("information",
    newHtml("participant_gender", "part_gender.html")
        .inputWarning("We would like you to type some text in these fields")
        .cssContainer({"width":"720px"})
        .center()
        .print()
    ,
    newDropDown("input_gender", "--โปรดเลือกเพศสภาพที่ตรงกับท่าน--") // a dropdown list asks participants about their gender
        .add("ชาย", "หญิง", "ไม่อยู่ในระบบเพศขั้วตรงข้าม (non-binary)", "บุคคลข้ามเพศ (transgender)")
        .center()
        .print()
        .wait()
        .log()
    ,
    newHtml("participant_age", "part_age.html")
        .cssContainer({"width":"720px"})
        .center()
        .print()
    ,    
    newDropDown("input_age", "--โปรดเลือกช่วงอายุที่ตรงกับท่าน--") // a dropdown list asks participants about their age
        .add("5-15", "16-25", "26-35", "36-45", "46-55", "56-65", "66-75")
        .center()
        .print()
        .wait()
        .log()
    ,
    newHtml("participant_hour", "part_hour.html")
        .cssContainer({"width":"720px"})
        .center()
        .print()
    ,
     newDropDown("input_hour", "--โปรดเลือกช่วงจำนวนชั่วโมงที่ตรงกับการใช้เวลากับสื่อสังคมออนไลน์--") // a dropdown list asks participants about their hours of social media consumption
        .add("0 (ไม่ใช้ หรือแทบจะไม่ใช้เวลากับสื่อสังคมออนไลน์)", "1-3", "4-6", "7-9", "10-12", "13-15", "16+ (มากกว่า 16 ชั่วโมง)")
        .center()
        .print()
        .wait()
        .log()
    , 
    newHtml("participant_hand", "part_hand.html")
        .cssContainer({"width":"720px"})
        .center()
        .print()
    ,    
    newDropDown("input_hand", "--โปรดเลือกมือข้างที่ท่านถนัด--") // a dropdown list asks participants about their dominant hand
        .add("ถนัดมือซ้าย", "ถนัดมือขวา")
        .center()
        .print()
        .wait()
        .log()
    ,    
    newText("blank", "________________________________________________")
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    newButton("continue_next", "คลิกที่นี่ เพื่อไปหน้าถัดไป") // a button, "go to the next page"
        .center()
        .print()
        .wait()
    ,
    // create variables for storing participants' information
    newVar("Gender")
        .global()
        .set(getDropDown("input_gender"))
    ,
    newVar("Age")
        .global()
        .set(getDropDown("input_age"))
    ,
     newVar("Hour")
        .global()
        .set(getDropDown("input_hour"))
    ,
    newVar("Hand")
        .global()
        .set(getDropDown("input_hand"))
)

// Instructions
newTrial("instructions",
    defaultText
        .cssContainer({"margin-bottom":"1em"})
        .center()
        .print()
    ,
    // Test Instruction
    newText("instructions-1", "ข้อชี้แนะในการทำแบบทดสอบ")
    ,
    newText("instructions-2", "ขอต้อนรับทุกท่านเข้าสู่แบบทดสอบ !")
    ,
    newText("instructions-3", "โปรดอ่านและทำความเข้าใจข้อชี้แนะนี้ก่อนเริ่มทำแบบทดสอบ")
    ,
    newText("instructions-4", "ในแบบทดสอบนี้ จะปรากฏรูปภาพ หรือข้อความสั้น ๆ พร้อมกับคำถามและตัวเลือกคำตอบ")
    ,
    newText("instructions-5", "<b>ให้ท่านอ่านคำถาม และตอบคำถามโดยเลือกตัวเลือกคำตอบที่ตรงกับความคิดของท่าน อย่างรวดเร็วที่สุดเท่าที่จะทำได้</b>")
    ,
    newText("instructions-6", "กดปุ่ม <b>F</b>  บนแป้นพิมพ์ของท่าน เพื่อเลือกคำตอบทาง <b>ซ้าย</b> มือของท่าน<br>กดปุ่ม <b>J</b> บนแป้นพิมพ์ของท่าน เพื่อเลือกคำตอบทาง <b>ขวา</b> มือของท่าน")
    ,
    newText("instructions-6.5", "เพื่อความสะดวกในการทำแบบทดสอบ ขอแนะนำให้ท่านวางมือบนแป้นพิมพ์ตามภาพด้านล่าง")
    ,
    newImage("inst_example", "example.jpg")
        .size(400, 200)
        .center()
        .print()
    ,
    newText("instructions-7.5", "________________________________________________")
    ,
    newText("instructions-7", "หากท่านไม่เลือกตัวเลือกคำตอบภายใน 5 วินาที แบบทดสอบจะไปยังหน้าถัดไปโดยอัตโนมัติ")
    ,
    newButton("wait", "คลิกที่นี่ เพื่อเริ่มทำแบบทดสอบ") // a button, "start the test"
        .center()
        .print()
        .wait()
)

//TEMPLATE_1:Prompt_filler, 5 fillers: Participants will learn how to do the task here
Template("Filler_Image - 1.csv", row =>
    newTrial("FillersPrompt",
        defaultText
            .center()
        ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("PromptFiller_question", row.question)
            .center()
            .print()
        , 
        newImage("PromptFiller_image", row.image)
            .size(200, 200)
        ,    
        newText("PromptFiller_Ans1", row.answer1)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newText("PromptFiller_Ans2", row.answer2)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newCanvas("PromptFiller_canvas", 800, 400)
            .add(325, 0, getImage("PromptFiller_image"))
            .add(300, 225, getText("PromptFiller_Ans1"))
            .add(500, 225, getText("PromptFiller_Ans2"))
            .center()
            .print()
            .log()
        ,
        newTimer("timeout1", 5000) // edit the number to change the time limit (in millisecond)
            .start() // start the timer
        ,
        newKey("keypress1", "FJ") // a key, choose either F or J
            .log("first") // keep log of the key pressed
            .callback(getTimer("timeout1").stop()) // the timer stops when a button (either F or J) is pressed
        ,
        getTimer("timeout1")
            .wait() // the timer waits for 5 seconds before skipping autonatically to the next item
    )
    // keep logs of participants' performance 
    .log("item", row.item)
    .log("image_subj", row.image_subject)
    .log("quest_con", row.question_content)
    .log("gender", getVar("Gender"))
    .log("age", getVar("Age"))
    .log("hour", getVar("Hour"))
    .log("hand", getVar("Hand"))
)

//TEMPLATE_2:Prompt_test, 5 tests: Participants will learn how to do the task here
Template("Task_Demo.csv", row =>
    newTrial("TestDemo",
        defaultText
            .cssContainer({"margin-bottom":"1em"})
            .center()
        ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("DemoQuestion", "จากข้อความด้านล่าง ผู้พิมพ์จะสื่อความว่าอะไร")
            .center()
            .print()
        ,
        newText("DemoStimulus", row.stimuli)
            .center()
            .css({"font-size": "300%", "width": "300px"})
        ,
        newText("DemoChoice1", row.option1)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newText("DemoChoice2", row.option2)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newCanvas("DemoTest_stimuli", 450,200)
            .add(225, 25, getText("DemoStimulus"))
            .add(225, 175, getText("DemoChoice1"))
            .add(375, 175, getText("DemoChoice2"))
            .print()
            .log()
        ,
        newTimer("timeout2", 5000)
            .start()
        ,
        newKey("keypress2", "FJ")
            .log("first")
            .callback(getTimer("timeout2").stop())
        ,
        getTimer("timeout2")
            .wait()    
    )
    .log("group", row.group)
    .log("item", row.item)
    .log("stimulus", row.stimuli)
    .log("stem_freq", row.stem_frequency)
    .log("stem_mood", row.stem_mood)
    .log("status", row.status)
    .log("condition", row.condition)
    .log("cond_num", row.cond_num)
    .log("gender", getVar("Gender"))
    .log("age", getVar("Age"))
    .log("hour", getVar("Hour"))    
    .log("hand", getVar("Hand"))
)

//TEMPLATE_3:Test, 30 tasks: Participant's performance will be measured here
Template("Task_Test.csv", row =>
    newTrial("Test",
        defaultText
            .cssContainer({"margin-bottom":"1em"})
            .center()
        ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("question", "จากข้อความด้านล่าง ผู้พิมพ์จะสื่อความว่าอะไร")
            .center()
            .print()
        ,
        newText("stimulus", row.stimuli)
            .center()
            .css({"font-size": "300%", "width": "300px"})
        ,
        newText("choice1", row.option1)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newText("choice2", row.option2)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newCanvas("test_stimuli", 450,200)
            .add(225, 25, getText("stimulus"))
            .add(225, 175, getText("choice1"))
            .add(375, 175, getText("choice2"))
            .print()
            .log()
        ,
        newTimer("timeout3", 5000)
            .start()
        ,
        newKey("keypress3", "FJ")
            .log("first")
            .callback(getTimer("timeout3").stop())
        ,
        getTimer("timeout3")
            .wait()
    )
    .log("group", row.group)
    .log("item", row.item)
    .log("stimulus", row.stimuli)
    .log("stem_freq", row.stem_frequency)
    .log("stem_mood", row.stem_mood)    
    .log("status", row.status)
    .log("condition", row.condition)
    .log("cond_num", row.cond_num)
    .log("gender", getVar("Gender"))
    .log("age", getVar("Age"))
    .log("hour", getVar("Hour"))
    .log("hand", getVar("Hand"))
)

//TEMPLATE_4:Fillers, 45 fillers: similar to TEMPLATE_1
Template("Filler_Image - 2.csv", row =>
    newTrial("Fillers",
        defaultText
            .center()
        ,
        newTimer("break", 1000)
            .start()
            .wait()
        ,
        newText("filler_question", row.question)
            .center()
            .print()
        , 
        newImage("filler_image", row.image)
            .size(200, 200)
        ,    
        newText("Ans1", row.answer1)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newText("Ans2", row.answer2)
            .center()
            .css({"font-size": "150%", "width": "300px"})
        ,
        newCanvas("filler_canvas", 800, 400)
            .add(325, 0, getImage("filler_image"))
            .add(300, 225, getText("Ans1"))
            .add(500, 225, getText("Ans2"))
            .center()
            .print()
            .log()
        ,
        newTimer("timeout4", 5000)
            .start()
        ,
        newKey("keypress4", "FJ")
            .log("first")
            //.wait()
            .callback(getTimer("timeout4").stop())
        ,
        getTimer("timeout4")
            .wait()    
    )
    .log("item", row.item)
    .log("image_subj", row.image_subject)
    .log("quest_con", row.question_content)
    .log("gender", getVar("Gender"))
    .log("age", getVar("Age"))
    .log("hour", getVar("Hour"))
    .log("hand", getVar("Hand"))
) 

// Send results manually
SendResults("send")

// Completion/End Screen
newTrial("completion_screen",
    newText("thanks", "<b>ขอขอบคุณอย่างยิ่งที่ท่านเข้าร่วมทำแบบทดสอบนี้</b>") // express gratitude to participants
        .center()
        .print()
    ,
    newText("exit_window", "ท่านสามารถปิดหรืออกจากหน้าจอนี้ได้") // a message ensuring that the participants are safe and free to leave the test
        .center()
        .print()
    ,
    newButton("void", "")
        .wait()
)
