import React, { Component } from 'react';
import { QuizData } from './../../QuizData ';
import { Link } from "react-router-dom";
export default class Quiz extends Component {

  state = {
    userAnswer:0,    //current users answer
    currentIndex:0,  //current questions index      
    quizEnd: false, //True if it's the last question
    score: 0, //the Score
    disabled: true,
    category:'',
    difficulty:'',
    name:'',
    AllQuestions:[],
    FilterdQuestions :[{question:'' , answer:'',options:[]}],
    isLoding:false,
    SelectionResult :false 
  }
 

//Load the quiz once the component mounts
componentDidMount(){
  const{name,category,difficulty}=this.props;
  let AllQuestions =QuizData ; 
  this.setState({
    name:name,
    category:category , 
    difficulty:difficulty,
    AllQuestions:AllQuestions,
    isLoding:true
  });

   this.filterdQuestions(AllQuestions , category , difficulty);
}


  //Update the component
  componentDidUpdate(prevProps, prevState){
    const{name,category,difficulty}=this.props;
    let AllQuestions =QuizData ; 
    if(this.state.userAnswer !== prevState.userAnswer){
    this.setState({
      name:name,
      category:category , 
      difficulty:difficulty,
      AllQuestions:AllQuestions,
      isLoding:true
    });
    console.log(' done');
    }
  
  }


  //filterd The Questions 
  filterdQuestions = (AllQuestions ,category ,difficulty )=>{

    let b = AllQuestions.filter(Q =>{
      return Q.category === category && Q.difficulty=== difficulty;
    });
    
    
      this.setState({
    
      FilterdQuestions:b
    
      })
    }

    //to next question 
    next_Question = () => {
      const {currentIndex}=this.state ;
      this.setState({
          currentIndex: currentIndex + 1    
      });
      this.changingScore();
    }


    //Check the answer

    checkAnswer = (userAnswer ,answer) => {
      if(userAnswer === answer ){
        this.setState({
          userAnswer:userAnswer,
          SelectionResult:true ,
          disabled:false
        })
    }
    else{
      this.setState({
        userAnswer:userAnswer,
        SelectionResult:false ,
        disabled:false
      })
    }
    }


    // changing the Score
    changingScore=()=>{
      const {score ,SelectionResult}=this.state ; 
      if(SelectionResult){
        this.setState({score: score + 1}) 
      }
    }


    // Responds to the click of the finish button
    finish =() => {
          this.changingScore();
          if(this.state.currentIndex === this.state.FilterdQuestions.length -1){
            this.setState({
              quizEnd:true
            })
          }      
      }


    // print your grade   
    printTheResult=()=>{
        alert('Your Grade is '+ this.state.score);
    }


  
    render() {
      
      const {currentIndex ,score ,userAnswer,FilterdQuestions,name}=this.state ;
      const {question , options ,answer }=FilterdQuestions[currentIndex];

    return (
      <>

      <div className="quiz">
      <span className="subtitle">اهلا زميل {name} </span> 

      <div className="container">
      <div className="box">

      <h2>{question}</h2>
    
      
        <span>{`Question ${currentIndex +1 } of ${QuizData.length}`}</span>
        <span className='quizInfo' > اسم المادة :{QuizData[currentIndex].category}
             {QuizData[currentIndex].difficulty}
             <span  className='quiz-score' > Score : {score} </span>   
        </span>

        {
            options.map(option=>
                <p key={Math.random()} className={`options ${userAnswer === option?"selected" : 0}`} 

                onClick ={()=>this.checkAnswer(option ,answer) }
                >
                    {option}

                </p>
                )
        }


        {
         currentIndex < FilterdQuestions.length -1 &&
        
         <button  disabled={this.state.disabled} onClick={this.next_Question}>
            السؤال التالي
         </button>
        }


        { 
        (currentIndex === FilterdQuestions.length -1)?
        (!this.state.quizEnd)
        ?
        <button disabled={this.disabled} onClick= {this.finish}       >
            انهاء الامتحان
        </button>
        :
         <Link to="/" className="btn btn-primary" disabled={this.disabled} onClick={this.printTheResult}>The Result </Link>
        :''
        }

        </div>

        </div>
     
   </div>
      </>
    )
  }
}
