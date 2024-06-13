import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    bucket;
    
    constructor(){
        this.client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject('66573a440025d8b7644f');
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                '66573add000b481e6a21',
                '66573af5001df060ddb5',
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                '66573add000b481e6a21',
                '66573af5001df060ddb5',
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: updatePost :: error", error);
            throw error;
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                '66573add000b481e6a21',
                '66573af5001df060ddb5',
                slug
            
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                '66573add000b481e6a21',
                '66573af5001df060ddb5',
                slug
            
            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                '66573add000b481e6a21',
                '66573af5001df060ddb5',     
                queries,   
                [
                    Query.limit(10),
                    Query.offset(0)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


    async searchPosts(query, limit = 10, offset = 0) {
        try {
          return await this.databases.listDocuments(
            '66573add000b481e6a21', 
            '66573af5001df060ddb5',
            [ 
                Query.search('title', query),
                Query.limit(limit),
                Query.offset(offset)
            ]
          )
        } catch (error) {
            console.error('Error searching posts:', error);
            return { documents: [] }; 
        }
    }

    

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                '66573b8b002fee023350',
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite serive :: uploadFile :: error", error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                '66573b8b002fee023350',
                fileId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deleteFile :: error", error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            '66573b8b002fee023350',
            fileId
        )
    }
}


const service = new Service()
export default service