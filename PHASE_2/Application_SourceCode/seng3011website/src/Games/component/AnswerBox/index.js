import React from 'react'
import { Item, Wrapper } from './styled'
// code source : https://github.com/ozluy/react-hangman/tree/master/src/components

export default ({ spaces, correctLetters, wordFromAPI }) => (
  <Wrapper>
    {spaces.map((item, index) => (
      <Item disabled key={`space-${index}`} />
    ))}
    {wordFromAPI.map((letter, index) => {
      return (
        <Item key={index}>
          {correctLetters.find(x => x === letter) ? letter : ''}
        </Item>
      )
    })}
  </Wrapper>
)
