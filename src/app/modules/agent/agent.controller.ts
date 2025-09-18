import catchAsync from '../../utils/catchAsycn';
import sendResponse from '../../utils/sendResponse';
import { agentService } from './agent.service';

const requestAgent = catchAsync(async (req, res) => {
  const file = req.file;
  const fromData = req.body.data ? JSON.parse(req.body.data) : req.body;
  const result = await agentService.requestAgent(fromData, file);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Agent requested successfully',
    data: result,
  });
});

export const agentController = {
  requestAgent,
};
