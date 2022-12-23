export interface PostBody {
  title: string;
  freeGiveAway: boolean;
  images: string[];
  networks: string[];
  price: string;
  published: string;
  user: {
    username: string;
    phonenumber: string;
    _id: string;
  };
}

export interface CreatePostBody {
  title: string;
  freeGiveAway: boolean;
  images: string[];
  networks: string[];
  price: string;
  published?: boolean;
  details: string;
}
