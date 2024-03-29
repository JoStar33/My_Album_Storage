import React, { useState } from "react";
import styled from "styled-components";
import AlbumBox from "../../albums/AlbumBox";
import SelectedAlbumBox from "../../albums/SelectedAlbumBox";
import ScoreDialog from "../scoreDialogs/ScoreDialog";
import AlbumSkeleton from "../../forms/loadingForm/AlbumSkeleton";
import LoadingForm from "../../forms/loadingForm/LoadingForm";
import SearchAlbumForm from "../../forms/commonForms/SearchAlbumForm";
import AlbumDialogController from "../../forms/commonForms/AlbumDialogControllerForm";
import SearchGuideForm from "../../forms/initForm/SearchGuideForm";
import NotFoundAnyAlbum from "../../forms/errorForm/NotFoundAnyAlbum";
import { albumType } from "../../../types/album";
import { RootState } from "../../../store";
import { useSelector } from "react-redux";

type propsType = {
  setAlbumDialog: React.Dispatch<React.SetStateAction<boolean>>;
};

const AlbumDialog: React.FC<propsType> = ({ setAlbumDialog }) => {
  //선택된 앨범 정보
  const [selectedAlbums, setSelectedAlbums] = useState([] as albumType[]);
  //스코어 설정 다이얼로그
  const [scoreDialog, setScoreDialog] = useState({
    scoreAlbum: {} as albumType,
    isOpened: false,
  });
  //검색이 시작됐는지 검사하는 state
  const [isSearchStarted, setIsSearchStarted] = useState(false);
  //검색된 앨범 정보
  const { searchAlbums, getSpotifyAlbumLoading, postAlbumLoading } =
    useSelector((state: RootState) => state.albumStore);
  return (
    <DialogBackground>
      <AlbumDialogContainer>
        <SearchAlbumForm
          setIsSearchStarted={setIsSearchStarted}
        ></SearchAlbumForm>
        <SelectedAlbumContainer>
          {selectedAlbums.map((album) => (
            <SelectedAlbumBox
              key={album.key}
              album={album}
              selectedAlbums={selectedAlbums}
              setSelectedAlbums={setSelectedAlbums}
              scoreDialog={scoreDialog}
              setScoreDialog={setScoreDialog}
            ></SelectedAlbumBox>
          ))}
        </SelectedAlbumContainer>
        <AlbumViewer>
          {!getSpotifyAlbumLoading &&
            (searchAlbums.length !== 0 ? (
              searchAlbums.map((album) => (
                <AlbumBox
                  key={album.key}
                  album={album}
                  selectedAlbums={selectedAlbums}
                  setSelectedAlbums={setSelectedAlbums}
                  scoreDialog={scoreDialog}
                  setScoreDialog={setScoreDialog}
                ></AlbumBox>
              ))
            ) : isSearchStarted ? (
              <NotFoundAnyAlbum></NotFoundAnyAlbum>
            ) : (
              <SearchGuideForm></SearchGuideForm>
            ))}
          {getSpotifyAlbumLoading &&
            new Array(12)
              .fill(1)
              .map((_, i) => <AlbumSkeleton key={i}></AlbumSkeleton>)}
        </AlbumViewer>
        <AlbumDialogController
          setAlbumDialog={setAlbumDialog}
          selectedAlbums={selectedAlbums}
        ></AlbumDialogController>
        {postAlbumLoading && <LoadingForm></LoadingForm>}
      </AlbumDialogContainer>
      {scoreDialog.isOpened && (
        <ScoreDialog
          selectedAlbums={selectedAlbums}
          setSelectedAlbums={setSelectedAlbums}
          scoreDialog={scoreDialog}
          setScoreDialog={setScoreDialog}
        ></ScoreDialog>
      )}
    </DialogBackground>
  );
};
const Centering = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SelectedAlbumContainer = styled.div`
  width: 90%;
  height: 20%;
  background-color: #b8f2f0;
  border-radius: 20px;
  box-shadow: 0 8px 8px 0 gray;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 10px; /* 스크롤바의 너비 */
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #217af4; /* 스크롤바의 색상 */
    border-radius: 10px;
  }
`;

const AlbumDialogContainer = styled(Centering)`
  flex-direction: column;
  width: 84vw;
  height: 80vh;
  border-radius: 25px;
  background-color: white;
  box-shadow: 0 8px 8px 0 gray;
`;

const AlbumViewer = styled.div`
  border: 3px solid black;
  border-radius: 20px;
  margin-top: 8px;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  overflow-y: scroll;
  width: 90%;
  height: 60%;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const DialogBackground = styled(Centering)`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100vw;
  height: 200vh;
  top: 0;
  left: 0;
`;

export default AlbumDialog;
