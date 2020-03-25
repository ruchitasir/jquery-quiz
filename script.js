//We want Selections to be hidden on the initial load and to appear after start quiz is clicked
//We want Start quiz to say restart quiz after it is clicked

const startButton = $('#start')
const promptQuestion = $('#prompt')
let questionIndex = 0
const DISPLAY_CSS = 'block'
const quizForm = $('.form') 
let rbOne = $('#one')
let radioButton = $('.answer')

let nextSubmit = $('.next')
let userScore =0;
let restart = false;
let resultDiv = document.getElementById('result');
let resultChildId = 'resultChildID'
let userChoice = []

let questions = [{
    prompt: "What is the best Generation 1 starter Pokemon?",
    answers: ["Bulbasaur", "Squirtle", "Charmander", "Pikachu"],
    correctAnswerIndex: 0
  }, {
    prompt: "Which legendary Pokemon has the power to control time?",
    answers: ["Mewtwo", "Lugia", "Dialga", "Rayquaza"],
    correctAnswerIndex: 2
  }, {
    prompt: "This Pokemon is so overwhelmingly powerful, it can bring down a whole mountain to make its nest.",
    answers: ["Charizard", "Dragonite", "Tyranitar", "Nidoking"],
    correctAnswerIndex: 2
  }, {
    prompt: "What mythical Pokémon is said to have swelled the seas with rain and tidal waves?",
    answers: ["Palkia", "Gyarados", "Mew", "Kyogre"],
    correctAnswerIndex: 3
  }, {
    prompt: "What Pokemon can sense the auras and take in feelings from all creatures from over half a mile away?",
    answers: ["Alakazam", "Lucario", "Latios", "Celebi"],
    correctAnswerIndex: 1
  }];

  let answersLength = questions[questionIndex].answers.length;
  let questionsLength =questions.length;

  //function that loops over question array 
  //when start is clicked, displays first question (radio inputs and next button)
  //when next is clicked, moves to the next question
const displayQuestion = () => {
  if(questionIndex < questionsLength ){
    promptQuestion.text(questions[questionIndex].prompt)
    quizForm.css('display', DISPLAY_CSS)
    radioButton.prop('checked',false);
    fetchChoices()
  }
    
}

//display choice from array funtion next to radio buttons
const fetchChoices = () => {
  let answersArea = questions[questionIndex].answers
    console.log(answersArea)
    for (let i = 0; i < answersLength; i++) {
    $('#'+i).next().text(answersArea[i])
     }
}

      
  //Submit function for Next Button
  //Pushes everything to the user Array every time next is clicked
  //If radio input is not selected when next is clicked, it will stay on the page
  //Resets the radio inputs for the next question after submitting to the userChoice array
  const nextPage=(e)=>{
    e.preventDefault()
    let radioCheck = $("input:radio[name='choice']").is(":checked")
    console.log(radioCheck)
    if(radioCheck)
    {    
      if(questionIndex < questions.length )
      {   
      storeResult();
      questionIndex++;
        if(questionIndex == (questions.length))
        {
          endQuiz();
          console.log('Result page')
          
        }
        else{
          displayQuestion();  
        }
      }
    } 
  }


  //End Quiz function
  //Hides Next Button and Selection inputs
  //Returns display of user score from userChoice array and the correct answers
  const endQuiz=()=>{
    nextSubmit.css('display', 'none');
    quizForm.css('display','none');
    promptQuestion.css('display','none');
    displayResult()
    restart= true;
  }

  const displayResult=()=>{
    for(let i=0;i<questionsLength;i++)
    { let crtIndex = questions[i].correctAnswerIndex
      let  userIndex = userChoice[i]
      console.log('userIndex',userIndex);
      console.log('crtIndex',crtIndex);
      let crtAnswer = questions[i].answers[crtIndex]
      let userAnswer = questions[i].answers[userIndex]

      let divChild = document.createElement('div');
      divChild.setAttribute('id', resultChildId+i);
      divChild.setAttribute('class', 'resultChildClass');
      divChild.textContent = ('User answer: '+userAnswer+ 'Correct answer: '+ crtAnswer)
      resultDiv.appendChild(divChild);
    }
    let quizScore = document.createElement('div');
    quizScore.setAttribute('class', 'quizScoreClass');
    quizScore.setAttribute('id', 'quizScoreId');
    quizScore.textContent = 'Your score: ' +userScore + '/'+ questionsLength;
    resultDiv.appendChild(quizScore);
  }
  
  const refresh=()=>
  { 
    let quizScore = document.getElementById('quizScoreId')
      resultDiv.removeChild(quizScore)
    for(let i=0;i<questionsLength;i++)
    {
      let divChild = document.getElementById(resultChildId+i);
      resultDiv.removeChild(divChild);
    }    
  }

 const storeResult =()=>{
    rad =  $("input:radio[name='choice']")
    for (let i =0; i < rad.length; i++) {
      if (rad[i].checked) {
        userChoice[questionIndex] = i;
      } 
    }
      checkAnswerCorrect()
 }

const checkAnswerCorrect =()=>{
  if(userChoice[questionIndex] == questions[questionIndex].correctAnswerIndex)
  {
    userScore++;
  }
}

  //Function for start button
  //hides our intro on the first page loaded when clicked
  //after first click changes text to Restart Quiz
  //If the button's text === Restart quiz, resets the quiz
  const startQuiz = () => {
    if(!restart)
    {
    document.getElementById('music').play()
    startButton.text('Restart Quiz')
    $('#intro').css('display','none');
    console.log('You started the quiz')
    questionIndex =0;
    displayQuestion() 
    }  
    else{
      $('#intro').css('display',DISPLAY_CSS);
      startButton.text('Start Quiz')
      console.log('You restarted the quiz again')
      restart = false;
      refresh()
      location.reload()
    }
   
}

nextSubmit.click(nextPage)
startButton.click(startQuiz)