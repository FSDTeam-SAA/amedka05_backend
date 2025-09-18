import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import { IAgent } from './agent.interface';
import Agent from './agent.model';

const requestAgent = async (payload: IAgent, file?: Express.Multer.File) => {
  const agent = await Agent.findOne({ email: payload.email });
  if (agent) throw new AppError(404, 'Agent alrady created');

  if (file) {
    const agentImage = await fileUploader.uploadToCloudinary(file);
    payload.image = agentImage.secure_url;
  } else {
    const idx = Math.floor(Math.random() * 100) + 1;
    payload.image = `https://avatar.iran.liara.run/public/${idx}.png`;
  }

  const result = await Agent.create(payload);
  if (!result) throw new AppError(404, 'Agent not created');

  return result;
};

export const agentService = {
  requestAgent,
};
