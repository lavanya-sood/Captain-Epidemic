import React, { useState, useRef } from 'react'
import { Button } from './component/Result/styled'
import AnswerBox from './component/AnswerBox'
import FailBox from './component/FailBox'
import Result from './component/Result'
import Human from './component/Human'
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
            setResultBox({
              disabled: false,
              title: `Game Over { word: ${word} }`,
              buttonLabel: 'Restart Game',
            })
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
    fetch("/symptoms")
        .then(res => res.json())
        .then(res => {
          let r = JSON.parse(res);
          let i = 0;
          console.log(r['result'])
          let symptom = r['result'][i]['reports'][0]['syndromes'][0]
          while (r['result'][i]['reports'][0]['syndromes'].length == 0){
             i = i + 1
          }
          symptom = r['result'][i]['reports'][0]['syndromes'][0]
          console.log(symptom)
          console.log(i)
          symptom = 'banana'
          wordSetter(symptom)
          return res.status
        })
        .catch(error => {
            console.log(error)
            const symptoms = [
              'Cough'
            ]
            const random = symptoms[Math.floor(Math.random() * symptoms.length)]
            wordSetter(random)
          })
  }


  const countCorrectLetters = correctLetters => {
    let uniqueLetters = filterUniqueItems(wordFromAPI)
    if (correctLetters.length === uniqueLetters.length) {
      setResultBox({
        disabled: false,
        title: '★ You Won! ★',
        buttonLabel: 'Play Quiz',
      })
      setIsGameOver(true)
      saveGameData()

    }
  }
  // save data to database
  const saveGameData = () => {
    let disease = localStorage.getItem('game-disease');
    let username = localStorage.getItem('username');

    // save game into db
    axios.post('/savegame', {
      username:username,
      quiz:disease
    })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (error) {
      console.log("error");
    });

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

  return (
    <>
    <GlobalStyles />
    <AppWrapper>
      <GameInstruction>Press any keys (letters) to play.</GameInstruction>

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

      <FailBox failedLetters={failedLetters} />
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
        buttonAction={isPaused ? continueGame : startGame}
      />
      {!isPaused && <Button pause> Pause Game</Button>}
    </AppWrapper>
    </>

  )
}
