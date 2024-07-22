import * as sdk from "node-appwrite";

export const {
    NEXT_PUBLIC_ENDPOINT: ENDPOINT,
    PROJECT_ID,
    API_KEY,
    DATABASE_ID,
    CLIENT_COLLECTION_ID,
    CONSULTANT_COLLECTION_ID,
    APPOINTMENT_COLLECTION_ID,
    NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint('https://cloud.appwrite.io/v1').setProject('66959c56002ff4e4efb6').setKey("bc70dbeca41da02edce8e7f02a37327dc3d3ced9f555f4ffc4a7c142479ecb22f6b0bd3231137a3d9dce892481d8d1fe8cd3256d83b28a3336d7395060fd7b2f7d77d340007dcc89122edfb5ea9619e01d0109c9cdf66b5812ed47c6ab95f39ef444a7b6f5fc53f9eae9e8cddbce121479c2d87091c466739aecdb8ac3cd18ae");

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);