export interface IImage {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
  userId: number;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  password: string;
  role: string;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  images: IImage[];
}

export interface ImageResolver {
  image: IImage;
  error?: any;
}
