import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import appInitials from '../utils/fire-base';

export async function uploadedImageToFireBase(file: File) {
  try {
    const storage = getStorage(appInitials);

    const storageRef = ref(storage, '/images/' + file.name);
    const uploadImageToFireBase = await uploadBytes(storageRef, file);
    const downloadImage = await getDownloadURL(uploadImageToFireBase.ref);
    return downloadImage;
  } catch (error) {
    console.log(error);
  }
}
