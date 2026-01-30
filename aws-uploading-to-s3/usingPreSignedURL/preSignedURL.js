import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Initialize S3 Client
const s3Client = new S3Client({ region: process.env.AWS_REGION });

// Configuration
const BUCKET_NAME = process.env.BUCKET_NAME || "YOUR_BUCKET_NAME";
const URL_EXPIRATION_SECONDS = 300; // 5 minutes

export const handler = async (event) => {
    console.log("Event:", JSON.stringify(event, null, 2));

    try {
        // Parse request body or query parameters
        let fileName, contentType, action;

        if (event.body) {
            const body = JSON.parse(event.body);
            fileName = body.fileName;
            contentType = body.contentType;
            action = body.action || "upload";
        } else if (event.queryStringParameters) {
            fileName = event.queryStringParameters.fileName;
            contentType = event.queryStringParameters.contentType;
            action = event.queryStringParameters.action || "upload";
        }

        // Validate required parameters
        if (!fileName) {
            return buildResponse(400, {
                error: "Missing required parameter: fileName"
            });
        }

        // Generate unique file key to prevent overwrites
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const fileKey = `uploads/${timestamp}-${randomString}-${fileName}`;

        let signedUrl;
        let command;

        if (action === "download") {
            // Generate pre-signed URL for downloading
            command = new GetObjectCommand({
                Bucket: BUCKET_NAME,
                Key: fileKey
            });
        } else {
            // Generate pre-signed URL for uploading (default)
            command = new PutObjectCommand({
                Bucket: BUCKET_NAME,
                Key: fileKey,
                ContentType: contentType || "application/octet-stream"
            });
        }

        // Generate the pre-signed URL
        signedUrl = await getSignedUrl(s3Client, command, {
            expiresIn: URL_EXPIRATION_SECONDS
        });

        console.log(`Generated pre-signed URL for ${action}:`, fileKey);

        return buildResponse(200, {
            uploadUrl: signedUrl,
            fileKey: fileKey,
            expiresIn: URL_EXPIRATION_SECONDS,
            bucket: BUCKET_NAME
        });

    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        return buildResponse(500, {
            error: "Failed to generate pre-signed URL",
            message: error.message
        });
    }
};

// Helper function to build HTTP response
function buildResponse(statusCode, body) {
    return {
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*", // Configure for your domain in production
            "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key",
            "Access-Control-Allow-Methods": "GET,POST,OPTIONS"
        },
        body: JSON.stringify(body)
    };
}
