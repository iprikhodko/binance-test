import React, { FC, useCallback } from 'react';
import { FavoriteContainer, FavoriteIcon } from './styled';

const FavoriteCell: FC<{
  name: string;
  isFavorite: boolean;
  onToggle: (instrumentName: string) => void;
}> = props => {
  const {
    name,
    isFavorite,
    onToggle,
  } = props;
  const onClick = useCallback(() => onToggle(name), [name, onToggle]);

  return (
    <FavoriteContainer onClick={onClick}>
      <FavoriteIcon
        name={isFavorite ? 'starFilled' : 'star'}
        isFavorite={isFavorite}
      />
    </FavoriteContainer>
  );
};

export default FavoriteCell;
