import React, {FC, useState} from 'react';
import { Container, SelectChangeEvent } from "@mui/material";
import CreateCardFrom from "../components/CreateCardFrom";
import {CardReducerState, ICard} from "../types/types";
import {nanoid} from "nanoid";
import CardItem from "../components/CardItem";
import SortSelect from "../components/SortSelect";
import {useSelector} from "react-redux";

const getId = () => {
  return nanoid()
}

const Home:FC = () => {
  const [sort, setSort] = useState<number>(10)
  const cards = useSelector((state: CardReducerState) => state.cardReducer.cards)

  const handleChangeSort = (e: SelectChangeEvent<number>) => {
    setSort(+e.target.value)
    Number(e.target.value) === 10 ? cards.sort((a, b) => a.info.name > b.info.name ? 1 : -1) : cards.sort((a, b) => a.info.name < b.info.name ? 1 : -1)
  }

  return (
    <>
      <CreateCardFrom/>
      <Container style={{
        marginTop: '40px',
        width: '90%'
      }}>
        <SortSelect sort={sort} handleChangeSort={handleChangeSort}/>
        {cards.length > 0 ?
          cards.map((card: ICard) => (
            <CardItem key={getId()} card={card}/>
          ))
          :
          <div>Cards not found</div>
        }
      </Container>
    </>
  );
};

export default Home;