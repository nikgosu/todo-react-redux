import React, {FC, useEffect, useState} from 'react';
import {Button, Container, Grid, TextField} from "@mui/material";
import {ICard} from "../types/types";
import {useDispatch} from "react-redux";
import {addCardAction} from "../redux/actionCreators/cardActionCreators";
import {SetLS} from "../LS/setLS";


const CreateCardFrom:FC = () => {

  const [card, setCard] = useState<ICard>()
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [isEmpty, setIsEmpty] = useState(false)

  const dispatch = useDispatch()

  const handleCreateByEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCreateCard()
  }

  const handleCreateCard = () => {
    if (nameValue !== '' && descriptionValue !== '') {
      setCard({
        id: Date.now(),
        info: {
          name: nameValue,
          description: descriptionValue
        },
        isImportant: false,
        isDone: false
      })
      setNameValue('')
      setDescriptionValue('')
      setIsEmpty(false)
    } else {
      setIsEmpty(true)
    }
  }

  useEffect(() => {
    card && dispatch(addCardAction(card))
    SetLS('cards')
  }, [card, dispatch])

  return (
    <Container style={{
      marginTop: '40px',
      width: '90%'
    }}>
      <Grid style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextField
          onKeyPress={handleCreateByEnter}
          value={nameValue}
          error={isEmpty}
          id={isEmpty ? 'outlined-error' : ''}
          onChange={(e) => setNameValue(e.target.value)}
          placeholder='Name'
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <TextField
          onKeyPress={handleCreateByEnter}
          value={descriptionValue}
          error={isEmpty}
          onChange={(e) => setDescriptionValue(e.target.value)}
          placeholder='Description'
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
      }}>
        <Button onClick={handleCreateCard} variant='contained'>Create card</Button>
      </Grid>
    </Container>
  );
};

export default CreateCardFrom;