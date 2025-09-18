import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import { ICreator } from './creator.interface';
import Creator from './creator.model';

const requestCreator = async (
  payload: ICreator,
  files?: Express.Multer.File[],
) => {
  const creator = await Creator.findOne({ email: payload.email });
  if (creator) throw new AppError(400, 'Creator already exists');

  if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const res = await fileUploader.uploadToCloudinary(file);
        return res.secure_url;
      }),
    );
    payload.image = uploadedImages;
  } else {
    const idx = Math.floor(Math.random() * 100) + 1;
    payload.image = [`https://avatar.iran.liara.run/public/${idx}.png`];
  }

  const result = await Creator.create(payload);
  if (!result) throw new AppError(400, 'Failed to create creator');

  return result;
};

export const creatorService = {
  requestCreator,
};
