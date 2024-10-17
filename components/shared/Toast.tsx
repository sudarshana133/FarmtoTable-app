import Toast from "react-native-toast-message";

interface ToastProps {
  type: "success"|"warning"|"error"|"info";
  text1: string;
  text2: string;
}

const showToast = (type: string, text1: string, text2: string) => {
  Toast.show({
    type,
    text1,
    text2,
    autoHide: true,
    visibilityTime: 2000,
  });
};

export const customToast: React.FC<ToastProps> = ({ type, text1, text2 }) => {
  switch (type) {
    case "success":
      showToast("success", text1, text2);
      return null;
    case "error":
      showToast("error", text1, text2);
      return null;
    case "warning":
      showToast("warning", text1, text2);
      return null;
  }
  return null;
};
