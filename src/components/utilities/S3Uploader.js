import AWS from 'aws-sdk';
import uuid4 from 'uuid';

/**
 * uploadFile
 *
 * Upload a file of any kind to our S3 bucket
 *
 * @param {File object} file - get from onChange event of input tag `e.target.files[0]`
 * @param {boolean} isImage
 * @param {(number, number) => {}} callback - void function. This will be called below when upload progress is made.
 *      It provides 2 numbers
 *          loaded: total bytes uploaded so far
 *          total: total bytes to be uploaded.
 *      percentage = (loaded / total) * 100
 *      Suggested use: some sort of progress bar component where the callback sets the amount filled
 *          to indicate progress to the user
 *
 * @returns public URL for uploaded file
 *      It will return the URL before Uploading is finished. I couldn't get the asynchronous
 *      stuff to work for the S3.upload() function. The callback is how we track the upload progress
 */
const uploadFile = (file, isImage, callback) => {
    const S3 = new AWS.S3({
        accessKeyId: process.env.REACT_APP_AWS_ID,
        secretAccessKey: process.env.REACT_APP_AWS_SECRET,
        region: process.env.REACT_APP_AWS_S3_REGION,
    });
    const extension = file.name.substring(file.name.lastIndexOf('.'));

    // Generate unique name using UUID4
    const fileName = `${isImage ? 'images/' : 'models/'}${uuid4()}${extension}`;
    const params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME,
        Key: fileName,
        Body: file,
        ACL: 'public-read',
        ContentType: file.type,
    };

    S3.upload(params)
        .on('httpUploadProgress', (evt) => {
            callback(evt.loaded, evt.total);
        })
        .send((err) => {
            if (err) {
                throw err;
            }
        });

    return `https://unite3d.s3-us-west-2.amazonaws.com/${fileName}`;
};

export default uploadFile;
