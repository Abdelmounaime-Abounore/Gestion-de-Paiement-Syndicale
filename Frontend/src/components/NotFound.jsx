import { Link } from "react-router-dom";

const NotFound = () => {
    return (
<section className="dark:bg-gray-900 bg-gray-200 h-screen flex justify-center items-center">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div className="mx-auto max-w-screen-sm text-center">
                    <h1 className="mb-4 font-extrabold lg:text-8xl text-black">404</h1>
                    <p className="mb-4 text-lg font-bold text-gray-700 dark:text-gray-400">Sorry, the page you requested does not exist or has been deleted.</p>
                    <Link to="/" className="inline-flex text-gray-100 bg-blue-600 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4">Back to Homepage</Link>
                </div>
            </div>
        </section>
    );
};

export default NotFound;