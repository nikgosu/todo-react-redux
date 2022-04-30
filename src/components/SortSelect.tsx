import React, {FC} from 'react';
import {FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";

interface Props {
  sort: number
  handleChangeSort: (e: SelectChangeEvent<number>) => void
}

const SortSelect:FC<Props> = ({sort, handleChangeSort}: Props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Сортировка</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={sort}
        label="Сортировка"
        onChange={handleChangeSort}
      >
        <MenuItem value={10}>В алфавитном порядке А-Я</MenuItem>
        <MenuItem value={20}>В алфавитном порядке Я-А</MenuItem>
      </Select>
    </FormControl>
  );
};

export default SortSelect;