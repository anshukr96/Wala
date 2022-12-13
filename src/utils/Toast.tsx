import Toast from 'react-native-toast-message';

interface SnackbarProps {
  type: 'error' | 'success' | 'warning';
  position?: 'top' | 'bottom';
  message: string;
}

const Snackbar = ({ type, message, position }: SnackbarProps) => {
  return Toast.show({
    type: type,
    text1: message,
    position: position || 'top',
  });
};

export default Snackbar;
