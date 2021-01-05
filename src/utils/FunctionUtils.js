import Toast from 'react-native-simple-toast';
import {PreferenceManager} from './../utils';
class FunctionUtils {
  static showToast(toastString) {
    setTimeout(() => Toast.show(toastString, Toast.SHORT), 10);
  }
}

export default FunctionUtils;
