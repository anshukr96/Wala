export interface SavePostBody {
  query: { id: string };
  payload: {
    title: string;
    networks: string;
    price: string;
    details: string;
  };
}
