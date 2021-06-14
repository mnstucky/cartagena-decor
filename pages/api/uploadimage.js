import { getSession } from 'next-auth/client';
import aws from 'aws-sdk';
import getAdmins from '../../services/getAdmins';

export default async (req, res) => {
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (session && admins.some((admin) => admin.email === session?.user?.email)) {
    aws.config.update({
      accessKeyId: process.env.AWS_CUSTOM_ACCESS_KEY,
      secretAccessKey: process.env.AWS_CUSTOM_SECRET_KEY,
      region: process.env.AWS_CUSTOM_REGION,
      signatureVersion: 'v4',
    });
    const s3 = new aws.S3();
    const post = s3.createPresignedPost({
      Bucket: process.env.AWS_BUCKET_NAME,
      Fields: {
        key: req.query.file,
      },
      Expires: 60, // seconds
      Conditions: [
        ['content-length-range', 0, 1048576], // up to 1 MB
      ],
    });
    res.status(200).json(post);
  } else {
    res.send({
      error: 'You must be logged in to upload an image.',
    });
  }
};
