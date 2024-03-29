import React, { useEffect, useState, useRef, memo } from "react";
import styled from "styled-components";
import { setIsSelected } from "../../store/album";
import { AppDispatch } from "../../store/index";
import { albumType } from "../../types/album";
import { useDispatch } from "react-redux";
import CheckComponent from "../forms/commonForms/CheckComponentForm";

type scoreDialogType = {
  scoreAlbum: albumType;
  isOpened: boolean;
};

type propsType = {
  album: albumType;
  selectedAlbums: albumType[];
  setSelectedAlbums: React.Dispatch<React.SetStateAction<albumType[]>>;
  scoreDialog: scoreDialogType;
  setScoreDialog: React.Dispatch<React.SetStateAction<scoreDialogType>>;
};

const AlbumBox: React.FC<propsType> = ({
  album,
  selectedAlbums,
  setSelectedAlbums,
  scoreDialog,
  setScoreDialog,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isLineOver, setIsLineOver] = useState(false);
  const albumText = useRef<any>(null);
  useEffect(() => {
    const height = albumText.current.clientHeight;
    if (height > 23) {
      setIsLineOver(true);
    }
  }, [album.key]);

  const handleClickAlbum = () => {
    selectedAlbums.find(
      (selectedAlbumData) => selectedAlbumData.key === album.key
    )
      ? cancelSelect()
      : openScoreDialog();
  };
  const cancelSelect = () => {
    dispatch(setIsSelected({ key: album.key, isSelected: false }));
    setSelectedAlbums(
      selectedAlbums.filter(
        (selectedAlbumData) => selectedAlbumData.key !== album.key
      )
    );
  };
  const openScoreDialog = () => {
    setScoreDialog({ ...scoreDialog, scoreAlbum: album, isOpened: true });
  };
  return (
    <AlbumBoxContainer onClick={handleClickAlbum}>
      <AlbumImg src={album.image} isLineOver={isLineOver} />
      <AlbumName ref={albumText} isLineOver={isLineOver}>
        {album.name}
      </AlbumName>
      {album.isSelected && <CheckComponent></CheckComponent>}
    </AlbumBoxContainer>
  );
};

const AlbumBoxContainer = styled.div`
  width: 14%;
  background-color: white;
  box-shadow: 0 6px 6px 0 gray;
  border-radius: 20px;
  margin-left: 1.3%;
  margin-right: 1.3%;
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  user-select: none;
  cursor: pointer;
`;

interface AlbumImgType {
  isLineOver: boolean;
}

const AlbumImg = styled.img<AlbumImgType>`
  margin-top: 1vw;
  width: ${(props) => (props.isLineOver ? "8vw" : "9vw")};
  height: ${(props) => (props.isLineOver ? "8vw" : "9vw")};
`;

const AlbumName = styled.span<AlbumImgType>`
  width: 90%;
  font-weight: 800;
  font-size: ${(props) => (props.isLineOver ? "6px" : "14px")};
`;

export default memo(AlbumBox);
