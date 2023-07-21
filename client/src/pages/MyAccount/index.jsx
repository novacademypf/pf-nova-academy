import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCoursesByProfileId } from "../../redux/actions/profileActions";
import { getOrdersCourse } from "../../redux/actions/ordersActions";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";

const MyAccount = () => {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.profileReducer.userProfile);
  const ordersCourses = useSelector(
    (state) => state.orderReducer.ordersCourses
  );
  const courseByProfile = useSelector(
    (state) => state.profileReducer.courseByProfile
  );
  const profilePhoto =
    userProfile?.photo ??
    "https://source.unsplash.com/random/800x600/?avatar=1";
  console.log("userProfile ordersCourses", ordersCourses);
  console.log("userProfile courseByProfile", courseByProfile);
  console.log("userProfile userProfile", userProfile);

  const id = localStorage.getItem("profileId");

  useEffect(() => {
    dispatch(getOrdersCourse(id));
    dispatch(getCoursesByProfileId());
  }, [dispatch]);

  return (
    <div>
      <div className="py-10">
        <div className="flex justify-center">
          <img
            className="w-[10em] h-[10em] mb-3 rounded-lg border-2 border-cyan-700"
            src={profilePhoto}
            alt="Imagen de perfil"
          />
        </div>
        <div className="text-center">
          <h2 className="text-lg font-bold">{userProfile?.name}</h2>
          <p className="text-sm">{userProfile?.email}</p>
        </div>
      </div>

      <div className="container mx-auto flex justify-evenly items-start bg-teal-50">
        <Card className="w-[30rem] my-10">
          <div className="flow-root">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Cursos Creados
              </h5>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {courseByProfile.map((e) => {
                return (
                  <Link to={`/courses-created/${e.id}`} key={e.id}>
                    <li className="py-3 sm:py-4 hover:bg-cyan-100 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            // Display
                            // Name
                            alt="Neil image"
                            className="rounded-full"
                            height="32"
                            src={e.images}
                            width="32"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {e.name}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {e.category}
                          </p>
                        </div>
                        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          ${e.price}
                        </div>
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </Card>
        <Card className="w-[30rem] my-10">
          <div className="flow-root">
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Cursos Comprados
              </h5>
            </div>
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {ordersCourses.map((e) => {
                return (
                  <Link to={`/courses-purchased/${e.id}`} key={e.id}>
                    <li className="py-3 sm:py-4 hover:bg-cyan-100 px-4">
                      <div className="flex items-center space-x-4">
                        <div className="shrink-0">
                          <img
                            // Display
                            // Name
                            alt="Neil image"
                            className="rounded-full"
                            height="32"
                            src={e.images}
                            width="32"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {e.name}
                          </p>
                          <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                            {e.category}
                          </p>
                        </div>
                        {/* <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                          ${e.price}
                        </div> */}
                      </div>
                    </li>
                  </Link>
                );
              })}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MyAccount;
