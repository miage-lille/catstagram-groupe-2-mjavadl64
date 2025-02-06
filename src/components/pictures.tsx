import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { picturesSelector, getSelectedPicture } from '../reducer';
import ModalPortal from './modal';
import { Picture } from '../types/picture.type'

const Container = styled.div`
  padding: 1rem;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
`;

const Image = styled.img`
  margin: 10px;
  object-fit: contain;
  transition: transform 1s;
  max-width: fit-content;
  &:hover {
    transform: scale(1.2);
  }
`;
const Pictures = () => {
  const dispatch = useDispatch();
  const pictures = useSelector(picturesSelector);
  const selectedPicture = useSelector(getSelectedPicture);

  const handlePictureClick = (picture : Picture) => {
    dispatch({ type: 'SELECT_PICTURE', picture });
  }

  const handleCloseModal = () => {
    dispatch({type: 'CLOSE_MODAL'});
  }
  
  return (
    <Container>
      {pictures.map((picture, index) => (
        <Image key={index} src={picture.previewFormat} alt={`Picture ${index + 1}`}
        onClick={() => handlePictureClick(picture)} />
      ))}
    {/* Afficher la modale si une image est sélectionnée */}
    {selectedPicture.webFormat && (
      <ModalPortal largeFormat={selectedPicture.largeFormat} close={handleCloseModal} />
    )}
    </Container>
  );
};

export default Pictures;
