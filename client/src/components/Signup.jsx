import React, { useContext } from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, login } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const onSubmit = (data) => {
        const email = data.email;
        const password = data.password;
        createUser(email, password)
            .then((result) => {
                const user = result.user;
                alert("Account creation successfully done!");
                document.getElementById("my_modal_5").close();
                navigate("/", { replace: true });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.error("error: ", errorMessage);
            });
    };

    return (
        <div className="bg-drkGreen min-h-screen flex items-center justify-center">
            <div className="max-w-md shadow w-full mx-auto bg-white rounded-lg p-6">
                <div className="modal-action flex flex-col justify-center mt-0">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="card-body bg-white p-6"
                        method="dialog"
                    >
                        <h3 className="font-bold text-lg text-black">Create An Account!</h3>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                {...register("email")}
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password")}
                            />
                            <label className="label mt-1">
                                <a href="#" className="label-text-alt link link-hover">
                                    Forgot password?
                                </a>
                            </label>
                        </div>

                        <div className="form-control mt-6">
                            <input
                                type="submit"
                                value="Signup"
                                className="btn bg-green text-white"
                            />
                        </div>

                        <p className="text-center my-2">
                            Have an account?{" "}
                            <button
                                className="underline text-drkGreen ml-1"
                                onClick={() => document.getElementById("my_modal_5").showModal()}
                            >
                                Login
                            </button>
                        </p>

                        <Link
                            to="/"
                            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        >
                            ✕
                        </Link>
                    </form>

                    <div className="text-center space-x-3 mb-5">
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGoogle />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaFacebookF />
                        </button>
                        <button className="btn btn-circle hover:bg-green hover:text-white">
                            <FaGithub />
                        </button>
                    </div>
                </div>
            </div>
            <Modal />
        </div>
    );
};

export default Signup;
