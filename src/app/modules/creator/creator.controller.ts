import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { creatorService } from './creator.service';

const requestCreator = catchAsync(async (req, res) => {
  const files = req.files as Express.Multer.File[];
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  
  const result = await creatorService.requestCreator(fromData, files);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Creator requested successfully',
    data: result,
  });
});

export const creatorController = {
  requestCreator,
};
