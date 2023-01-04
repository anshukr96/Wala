import Toast from 'react-native-toast-message';

interface SnackbarProps {
  type: 'error' | 'success' | 'warning';
  position?: 'top' | 'bottom';
  message: string;
  message2?: string;
}

const Snackbar = ({ type, message, message2, position }: SnackbarProps) => {
  return Toast.show({
    type: type,
    text1: message,
    text2: message2,
    position: position || 'top',
  });
};

export default Snackbar;
