export interface SaveFeedbackBody {
  text: string;
  type: string;
}

export interface UpdateUserBody {
  username: string;
  email: string;
  profileImage: string;
}
