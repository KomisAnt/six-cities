
import { cities } from '../const';

export type CityName = typeof cities[number];

export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
}

export type City = {
  name: CityName;
  location: Location;
}

export type Host = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type Offers = Offer[];

export type RoomOffer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: string[];
  host: Host;
  id: number;
  images: string[];
  isFavorite: boolean;
  isPremium: boolean;
  location: Location;
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type Point = {
  name: string;
  lat: number;
  lng: number;
}

export type Points = Point[];

export type Reviews = {
  id: number;
  authorAvatar: string;
  authorName: string;
  rating: number;
  reviewDate: string;
  reviewDescription: string;
}

export type UserComment = {
  avatarUrl: string;
  id: number;
  isPro: boolean;
  name: string;
}

export type RoomComment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: UserComment;
}

export type RoomComments = RoomComment[];

export type UserLoginStatusData = {
  avatarUrl: string;
  email: string;
  id: number;
  isPro: boolean;
  name: string;
  token: string;
}

export type AuthData = {
  login: string;
  password: string;
}

export type CommentPostData = {
  id: number;
  comment: string | null;
  rating: string | null;
}

export type FavoritePostData = {
  id: number;
  status: number;
}
