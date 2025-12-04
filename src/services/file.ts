import RNFS from 'react-native-fs';
import { Alert, PermissionsAndroid, Platform } from 'react-native';

const requestStoragePermission = async () => {
  if (Platform.OS === 'android' && Platform.Version < 33) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Payslip storage permission',
          message:
            'This app needs access to your storage to download payslips.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  return true;
};

export const downloadPayslip = async (fileName: string) => {
  const hasPermission = await requestStoragePermission();
  if (!hasPermission) {
    Alert.alert(
      'Permission Denied',
      'Storage permission is required to download the payslip.',
    );
    return;
  }

  const destPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;

  try {
    if (Platform.OS === 'android') {
      await RNFS.copyFileAssets(fileName, destPath);
    } else {
      const sourcePath = `${RNFS.MainBundlePath}/${fileName}`;
      await RNFS.copyFile(sourcePath, destPath);
    }
    Alert.alert('Success', `Payslip downloaded to ${destPath}`);
  } catch (error) {
    console.error(error);
    Alert.alert('Error', 'Failed to download payslip.');
  }
};
