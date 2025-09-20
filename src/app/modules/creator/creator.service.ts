import AppError from '../../error/appError';
import { fileUploader } from '../../helper/fileUploder';
import pagination, { IOption } from '../../helper/pagenation';
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



const getAllCreators = async (params: any, options: IOption) => {
  const { page, limit, skip, sortBy, sortOrder } = pagination(options);
  const { searchTerm, tier, ...filterData } = params;

  const searchableFields = [
    'fullName',
    'phoneNumber',
    'email',
    'bio',
    'description',
    'status',
    'interests',
    'tier'
  ];

  const andCondition: any[] = [];

  // Search filter
  if (searchTerm) {
    andCondition.push({
      $or: searchableFields.map((field) => ({
        [field]: { $regex: searchTerm, $options: 'i' },
      })),
    });
  }

  // 🎯 Exact filters (status, email, etc.)
  if (Object.keys(filterData).length > 0) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // 🛠 Build aggregation pipeline
  const pipeline: any[] = [
    // Step 1: base filters (before tier calculation)
    ...(andCondition.length > 0 ? [{ $match: { $and: andCondition } }] : []),

    // Step 2: calculate totalFollowers
    {
      $addFields: {
        totalFollowers: { $sum: '$socialMedia.followers' },
      },
    },

    // Step 3: assign tier
    {
      $addFields: {
        tier: {
          $cond: [{ $gte: ['$totalFollowers', 20000] }, 'top', 'mid'],
        },
      },
    },
  ];

  // Step 4: filter by tier (AFTER it exists)
  if (tier) {
    pipeline.push({ $match: { tier } });
  }

  // Step 5: sort + paginate
  pipeline.push(
    { $sort: { [sortBy || 'createdAt']: sortOrder === 'asc' ? 1 : -1 } },
    { $skip: skip },
    { $limit: limit },
  );

  // Run query
  const result = await Creator.aggregate(pipeline);

  // Count total (without pagination)
  const countPipeline = pipeline.filter(
    (stage) => !('$skip' in stage) && !('$limit' in stage) && !('$sort' in stage),
  );
  countPipeline.push({ $count: 'total' });

  const countResult = await Creator.aggregate(countPipeline);
  const total = countResult.length > 0 ? countResult[0].total : 0;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};


const singleCreator = async (id: string) => {
  const result = await Creator.findById(id);
  if (!result) throw new AppError(404, 'Creator not found');
  return result;
};


const updatedCreator = async (
  id: string,
  payload: Partial<ICreator>,
  files?: Express.Multer.File[],
) => {
  if (files && files.length > 0) {
    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const res = await fileUploader.uploadToCloudinary(file);
        return res.secure_url;
      }),
    );
    payload.image = uploadedImages;
  }
  const result = await Creator.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new AppError(404, 'Creator not found');
  return result;
};

const deleteCreator = async (id: string) => {
  const result = await Creator.findByIdAndDelete(id);
  if (!result) throw new AppError(404, 'Creator not found');
  return result;
};

const updatedStatus = async (id: string, status: ICreator['status']) => {
  const result = await Creator.findByIdAndUpdate(id, { status }, { new: true });

  if (!result) throw new AppError(404, 'Agent not found');

  return result;
};

export const creatorService = {
  requestCreator,
  getAllCreators,
  singleCreator,
  updatedCreator,
  deleteCreator,
  updatedStatus,
};
