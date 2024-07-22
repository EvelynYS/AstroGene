"use server";
import { ID, Query } from "node-appwrite";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";
import {
  BUCKET_ID,
  DATABASE_ID,
  ENDPOINT,
  CLIENT_COLLECTION_ID,
  PROJECT_ID,
  databases,
  storage,
  users,
} from "../appwrite.config";

export const createUser = async (user: CreateUserParams) => {
  try {
    const newUser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );
    return parseStringify(newUser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const documents = await users.list([Query.equal("email", [user.email])]);
      return documents?.users[0];
    }
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.log(error);
  }
};


export const getClient = async (userId: string) => {
  try {
    const clients = await databases.listDocuments(
    DATABASE_ID!,
    CLIENT_COLLECTION_ID!,
    [Query.equal('userId', userId)]  
    );
    return parseStringify(clients.documents[0]);
  } catch (error) {
    console.log(error);
  }
};

export const registerClient = async ({
  document,
  ...client
}: RegisterUserParams) => {
  try {
    let file;
    if (document) {
      const inputFile = InputFile.fromBuffer(
        document?.get("blobFile") as Blob,
        document?.get("fileName") as string
      );
      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newClient = await databases.createDocument(
      DATABASE_ID!,
      CLIENT_COLLECTION_ID!,
      ID.unique(),
      {
        documentId: file?.$id || null,
        documentUrl: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file?.$id}/view?project=${PROJECT_ID}`,
        ...client,
      }
    );
    return parseStringify(newClient);
  } catch (error) {
    console.log(error);
  }
};
