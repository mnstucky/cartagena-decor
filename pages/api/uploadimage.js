import { getSession } from 'next-auth/client';
import aws from 'aws-sdk';
import getAdmins from '../../services/getAdmins';

export default async (req, res) => {
  const session = await getSession({ req });
  const admins = await getAdmins();
  if (session && admins.some((admin) => admin.email === session?.user?.email)) {
    aws.config.update({
      accessKeyId: process.env.CUSTOM_AWS_ACCESS_KEY,
      secretAccessKey: process.env.CUSTOM_AWS_SECRET_KEY,
      region: process.env.CUSTOM_AWS_REGION,
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
