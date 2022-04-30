import React, {FC, useEffect, useState} from 'react';
import {ICard} from "../types/types";
import {Button, Container, Grid, TextField} from "@mui/material";
import {useDispatch} from "react-redux";
import {editCardAction} from "../redux/actionCreators/cardActionCreators";

const PopUpCard:FC = () => {

  const [card, setCard] = useState<ICard>(JSON.parse(localStorage.getItem('card') ?? ''))
  const [nameValue, setNameValue] = useState('')
  const [descriptionValue, setDescriptionValue] = useState('')
  const [isEdited, setIsEdited] = useState<boolean>()

  const dispatch = useDispatch()

  const updateCard = () => {
    setCard({...card, info: {name: nameValue, description: descriptionValue}})
    setIsEdited(true)
  }

  const handleUpdateByEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') updateCard()
  }

  useEffect(() => {
    if (isEdited) {
      dispatch(editCardAction(card))
      localStorage.setItem('editedCard', JSON.stringify(card))
      window.opener.postMessage('Card edited')
      window.close()
    }
  }, [isEdited, card, dispatch])

  useEffect(() => {
    if (card) {
      setNameValue(card.info.name)
      setDescriptionValue(card.info.description)
    }
  }, [card])

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
          onKeyPress={handleUpdateByEnter}
          value={nameValue}
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
          onKeyPress={handleUpdateByEnter}
          value={descriptionValue}
          onChange={(e) => setDescriptionValue(e.target.value)}
          placeholder='Description'
          style={{width: '100%'}}/>
      </Grid>
      <Grid style={{
        marginTop: '20px',
      }}>
        <Button onClick={updateCard} variant='contained'>Update card</Button>
      </Grid>
    </Container>
  );
};

export default PopUpCard;