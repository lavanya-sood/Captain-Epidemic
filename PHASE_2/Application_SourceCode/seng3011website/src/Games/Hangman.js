import React, { useState, useRef } from 'react'
import { Button } from './component/Result/styled'
import AnswerBox from './component/AnswerBox'
import FailBox from './component/FailBox'
import Result from './component/Result'
import Human from './component/Human'
import boycough from '../img/boycough.jpg';
import boyheadache from '../img/boyheadache.jpg';
import girlfever from '../img/girl-fever.jpg';
import '../index.css';
import ReactDOM from "react-dom";
import Modal from "react-bootstrap/Modal";
import ModalBody from "react-bootstrap/ModalBody";
import ModalHeader from "react-bootstrap/ModalHeader";
import ModalFooter from "react-bootstrap/ModalFooter";
import { Link } from "react-router-dom";
import logo from "../img/Logo.png";
import axios from 'axios';
import {
  Gallow,
  DownPipe,
  RightBlueTriangle,
  Input,
  AppWrapper,
  GameInstruction,
} from './styled'
import GlobalStyles from '../globalStyles'

export default () => {
  const [wordFromAPI, setWordFromAPI] = useState([])
  const [isPaused, setIsPaused] = useState(false)
  const [isGameOver, setIsGameOver] = useState(false)
  const [isGameWon, setIsGameWon] = useState(false)
  const [resultBox, setResultBox] = useState({
    disabled: false,
    title: 'Hangman',
    buttonLabel: 'Start Game',
  })
  const [failedLetters, setFailedLetters] = useState([])
  const [correctLetters, setCorrectLetters] = useState([])
  const [word, setWord] = useState('')
  const inputRef = useRef(null)

  const handOnKeyPress = event => {
    let keyChar = event.key
    event.preventDefault()
    if (
      wordFromAPI.length > 0 &&
      'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM'.indexOf(keyChar) >
        -1
    ) {
      keyChar = keyChar.toUpperCase()
      if (
        !failedLetters.find(x => x === keyChar) &&
        !correctLetters.find(x => x === keyChar)
      ) {
        let count = 0
        for (let i = 0; i < wordFromAPI.length; i++) {
          if (keyChar === wordFromAPI[i]) {
            count++
            const newCorrectLetters = correctLetters.concat([keyChar])
            setCorrectLetters(newCorrectLetters)
            countCorrectLetters(newCorrectLetters)
            return
          }
        }
        if (count === 0) {
          if (failedLetters.length === 10) {
            // setResultBox({
            //   disabled: false,
            //   title: `Game Over { word: ${word} }`,
            //   buttonLabel: 'Restart Game',
            // })
            setIsGameOver(true)
          }
          setFailedLetters(failedLetters.concat([keyChar]))
        }
      }
    }
  }

  const emptyBoxList = () => {
    let arrayOfSpace = []
    if (wordFromAPI.length > 0) {
      const arraySize = wordFromAPI.length
      for (let x = 0; x < 12 - arraySize; x++) {
        arrayOfSpace.push(' ')
      }
    }
    return arrayOfSpace
  }

  const startGame = () => {
    setResultBox({
      disabled: true,
    })
    setFailedLetters([])
    setCorrectLetters([])
    setWordFromAPI([])
    setWord('')
    getDataFromAPI()
    setIsGameOver(false)
    inputRef.current.focus()
  }

  const continueGame = () => {
    setResultBox({
      disabled: true,
    })
    inputRef.current.focus()
  }

  const wordSetter = word => {
    let wordArr = word.toUpperCase().split('')
    wordArr.map(item => {
      item === '-' && wordArr.splice(wordArr.indexOf('-'), 1)
      item === ' ' && wordArr.splice(wordArr.indexOf(' '), 1)
      return item
    })

    setWordFromAPI(wordArr)
    setWord(word)
  }

  const getDataFromAPI = () => {
    let disease = localStorage.getItem('game-disease')
    // ebola
    let symptom = 'fever'
    // yellow fever
    if (disease == "yellow fever"){
      symptom = 'headache'
    } else if (disease == 'ebola'){
      symptom = 'coughing'
    }
    wordSetter(symptom)

  }


  const countCorrectLetters = correctLetters => {
    let uniqueLetters = filterUniqueItems(wordFromAPI)
    if (correctLetters.length === uniqueLetters.length) {
      // setResultBox({
      //   disabled: false,
      //   title: '★ You Won! ★',
      //   buttonLabel: 'Play Quiz',
      // })
      saveGameData()
      setIsGameOver(true)
      setIsGameWon(true)
    }
  }
  // save data to database
  const saveGameData = () => {
    let disease = localStorage.getItem('game-disease');
    let username = localStorage.getItem('username');

    var storedQuiz= JSON.parse(localStorage.getItem("quiz"));

    if (!storedQuiz.includes(disease)){
      let g = localStorage.getItem('games')
      storedQuiz.push(disease)
      localStorage.setItem('quiz',JSON.stringify(storedQuiz))
      // save game into db
      axios.post('/savegame', {
        username:username,
        quiz:disease,
        score:5,
        icon:localStorage.getItem('game-icon')
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log("error");
      });
    // game already played hence update score
    } else {
      axios.post('/updategame', {
        username:username,
        quiz:disease,
        score:5
      })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (error) {
        console.log("error");
      });
    }
  }

  const filterUniqueItems = items => {
    const obj = {},
      uniqueItems = []
    for (var i = 0, l = items.length; i < l; ++i) {
      if (obj.hasOwnProperty(items[i])) {
        continue
      }
      uniqueItems.push(items[i])
      obj[items[i]] = 1
    }
    return uniqueItems
  }
  // restart game
  function refreshPage(){
    window.location.reload();
  }

  return (
    <>
    <GlobalStyles />
    <AppWrapper>
      <GameInstruction>Press any keys (letters) to play.</GameInstruction>
      <h4> Captain Epidemic Hangman Game </h4>

      <Gallow>
        <DownPipe />
        <Input
          ref={inputRef}
          {...(!isGameOver && !isPaused && { onKeyDown: handOnKeyPress })}
          onFocus={() => setIsPaused(false)}
          onBlur={() => {
            if (!isGameOver) {
              setIsPaused(true)
              setResultBox({
                title: 'Game is Paused',
                disabled: false,
                buttonLabel: 'continue',
              })
            }
          }}
        />
      </Gallow>
      <Human failedLetterCount={failedLetters.length} />
      <img src={girlfever} style={localStorage.getItem('game-disease') != 'yellow fever' && localStorage.getItem('game-disease') != 'ebola'? {} : { display: 'none' }}  width= "280" height = "330" left = "200px" alt = "hangmanpic"/>
      <img src={boycough} style={localStorage.getItem('game-disease') == 'ebola' ? {} : { display: 'none' }}  width= "280" height = "300" left = "200px" alt = "hangmanpic"/>
      <img src={boyheadache} style={localStorage.getItem('game-disease') == 'yellow fever' ? {} : { display: 'none' }}  width= "280" height = "330" left = "200px" alt = "hangmanpic"/>
      <FailBox failedLetters={failedLetters} />
      <div>
      <h4 style={localStorage.getItem('game-disease') == 'yellow fever' || localStorage.getItem('game-disease') == 'ebola'? {} : { display: 'none' }}> Charlie is showing symptoms for the disease. What symptom is that? </h4>
      <h4 style={localStorage.getItem('game-disease') != 'yellow fever' && localStorage.getItem('game-disease') != 'ebola'? {} : { display: 'none' }}> Lily is showing symptoms for the disease. What symptom is that? </h4>
      </div>
      <AnswerBox
        wordFromAPI={wordFromAPI}
        correctLetters={correctLetters}
        spaces={emptyBoxList()}
      />

      <RightBlueTriangle />
      <Result
        title={resultBox.title}
        disabled={resultBox.disabled}
        buttonLabel={resultBox.buttonLabel}
        buttonAction={isPaused && !isGameOver ? continueGame : startGame}
      />
      <Modal show={isGameOver} aria-labelledby="contained-modal-title-vcenter">
        <Modal.Header>
          <h3>Your result for this mission is </h3>
        </Modal.Header>
          <div className="quiz-div">
        <img
          src={logo}
          className="quiz-img"
          alt="Logo"
          width="110"
          height="100"
        />
          <div className="quiz-name">{isGameWon ? 'SUCCESS!': 'TRY AGAIN'}</div>
        </div>
        <Modal.Footer>
        <Link to="/Home">
          <Button className = "submitBtn">
            Go to Home
          </Button>
        </Link>
          <Button className = "submitBtn"  onClick = {refreshPage} >
            Restart
          </Button>
        </Modal.Footer>
      </Modal>
      {!isPaused && <Button pause> Pause Game</Button>}
    </AppWrapper>
    </>

  )
}
