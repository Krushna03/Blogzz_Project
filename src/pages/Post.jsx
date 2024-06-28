import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "./Spin/Loader";
import { FaEdit, FaTrash } from "react-icons/fa"; // Import icons

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setLoading(true);
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
                setLoading(false);
            });
        } else {
            navigate("/");
            setLoading(false);
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return loading ? (
        <div className="flex justify-center items-center h-96">
            <Loader />
        </div>
    ) : (
        post && (
            <div className="py-7 px-4 md:px-20">
                <div className="w-full flex justify-center mb-4 relative p-2 h-48 md:h-96">
                    <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl w-full h-full object-cover"
                    />
                    {post && (
                        <div className="absolute right-4 top-4 flex space-x-2">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button
                                    bgColor="bg-green-500"
                                    className="flex items-center px-4 py-2 rounded-full hover:bg-green-700 transition duration-300 "
                                >
                                    <FaEdit className="mr-2" />
                                    <span className="hidden sm:inline">Edit</span>
                                </Button>
                            </Link>
                            <Button
                                bgColor="bg-red-500"
                                onClick={deletePost}
                                className="flex items-center px-4 py-2 rounded-full hover:bg-red-600 transition duration-300"
                            >
                                <FaTrash className="mr-2" />
                                <span className="hidden sm:inline">Delete</span>
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-xl md:text-2xl font-bold text-center">{post.title}</h1>
                </div>
                <div className="browser-css px-4 md:px-20">
                    {parse(post.content)}
                </div>
             

             <div className="pt-8 font-bold align-center">
                <p className="sm:text-2xl">
                End of the Blog....🙂
                </p>
             </div>


            </div>

        )
    );
}
