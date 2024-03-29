import { spotifyAxios } from './axios/spotifyAxios';
import { customAxios } from './axios/customAxios';

const getSpotifyAlbum = (query: string, type:string) => {
  return spotifyAxios.get(`/v1/search`, {
    params: {
      q: query,
      type: type,
    },
    headers: {
      Authorization: `Bearer ${ sessionStorage.getItem('Spotify-Authorization') }`
    }
  });
};

const postAlbum = (userId: string, selectedAlbum: albumType[]) => {
  return customAxios.post(`/album/${userId}`, {
    selectedAlbum
  })
};

const getAlbum = (userId: string) => {
  return customAxios.get(`/album/${userId}`);
};

const deleteAlbum = (albumId: string) => {
  return customAxios.delete(`/album/${albumId}`);
};

const patchAlbum = (album: userAlbumType) => {
  return customAxios.patch(`/album/${album._id}`, {
    album
  });
};

type artist = {
  external_urls: Object,
  href: string,
  id: string,
  name: string,
  type: string,
  uri: string
};

type albumType = {
  key: string,
  artist: string,
  name: string,
  image: string,
  isSelected: boolean,
  score: number,
  description: string
};

type userAlbumType = {
  _id: string,
  artist: string,
  name: string,
  image: string,
  score: number,
  description: string,
  owner: string
};

type image = {
  height: number,
  url: string,
  width: number
};

export type item = {
  album_type: string,
  artists: artist[],
  available_markets: string[],
  external_urls: Object,
  href: string,
  id: string,
  images: image[],
  name: string,
  release_date: string,
  release_date_precision: string,
  total_tracks: number,
  type: string,
  uri: string
};

export type getAlbumParamType = {
  query: string,
  type: string
};

export { getSpotifyAlbum, postAlbum, getAlbum, deleteAlbum, patchAlbum };