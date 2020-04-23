import React from 'react'
import { Wrapper, List, ListItem, Title } from './styled'
// code source : https://github.com/ozluy/react-hangman/tree/master/src/components

export default ({ failedLetters }) => (
  <Wrapper>
    <Title>You missed:</Title>
    <List>
      {failedLetters.map(item => (
        <ListItem key={item}>{item}</ListItem>
      ))}
    </List>
  </Wrapper>
)
