import React, {FC, useEffect, useId, useState} from 'react';
import {Button, Card, CardActions, CardContent, Checkbox, FormControlLabel, Typography} from "@mui/material";
import {ICard} from "../types/types";
import {useDispatch} from "react-redux";
import {
  editCardAction,
  removeCardAction,
  setDoneAction,
  setImportantAction,
  updateCardAction
} from "../redux/actionCreators/cardActionCreators";
import {SetLS} from "../LS/setLS";

interface Props {
  card: ICard
}

const CardItem:FC<Props> = ({card}: Props) => {

  const dispatch = useDispatch()

  const [important, setImportant] = useState(card.isImportant)
  const [done, setDone] = useState(card.isDone)

  const handleImportanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportant(e.target.checked)
    dispatch(setImportantAction(card))
    SetLS('cards')
  }

  const handleUpdateCard = () => {
    dispatch(updateCardAction(card))
    SetLS('card')
    window.open(`/popup/:${card.id}`, 'pop-up', 'width=800,height=800')
  }

  const handleMessage = (e: MessageEvent) => {
    if (e.data === 'Card edited') {
      dispatch(editCardAction(JSON.parse(localStorage.getItem('editedCard') ?? '')))
    }
  }

  useEffect(() => {
    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, )

  return (
    <Card key={useId()} sx={{
      width: '100%',
      marginTop: '20px',
      border: important ? '5px solid aquamarine' : '1px solid lightgray'
    }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {card.info.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {card.info.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={handleUpdateCard}
          disabled={'disabled' && done}
          variant='contained'
          size="medium"
        >Update card
        </Button>
        <Button
          onClick={() => {
            dispatch(removeCardAction(card))
            SetLS('cards')
          }}
          disabled={'disabled' && done}
          variant="outlined" size="medium" color="error"
        >Delete card
        </Button>
        <FormControlLabel
          disabled={'disabled' && done}
          sx={{ marginLeft: '5px' }}
          control={<Checkbox checked={important} onChange={handleImportanceChange}/>}
          label="Important" />
        <Button
          onClick={() => {
            setDone(prev => !prev)
            dispatch(setDoneAction(card))
            SetLS('cards')
          }}
          variant='contained'
          size="small"
          color={done ? 'error' : "success"}
        >{done ? 'Not done' : 'Done'}
        </Button>
      </CardActions>
    </Card>
  );
};

export default CardItem;