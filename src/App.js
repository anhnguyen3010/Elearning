
import React, { lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import * as LottiePlayer from "@lottiefiles/lottie-player";
//Layouts
import AdminLayout from "./layouts/Admin";
import AppLayout from "./layouts/App";
//Custom Route
import AdminRoute from "./auth/AdminRoute";
// import UserRoute from "./auth/UserRoute";

//UserLayout
import PublicProfile from "./pages/UserProfile/PublicProfile";
import EditProfile from "./pages/UserProfile/EditProfile";
import CourseEnroll from "./pages/UserProfile/CourseEnroll";


//Pages w LazyLoad
const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const CoursesByCategory = lazy(() => import("./pages/CoursesByCategory"));
const Courses = lazy(() => import("./pages/Courses"));
const Course = lazy(() => import("./pages/Course"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const AdminCourses = lazy(() => import("./pages/AdminCourses"));
const AdminUsers = lazy(() => import("./pages/AdminUsers"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <>
      <Suspense
        fallback={
          <lottie-player
            autoplay
            loop
            mode="normal"
            src="https://assets10.lottiefiles.com/datafiles/ORpUnaV6z0mJ17E/data.json"
            style={{ width: "100vw", height: "100vh" }}
          ></lottie-player>
        }
      >
        <BrowserRouter>
          <Switch>
            <Route path="/admin">
              <AdminLayout>
                <AdminRoute>
                <Switch>
                  <Redirect exact from="/admin" to="/admin/courses" />
                  <AdminRoute path="/admin/courses">
                    <AdminCourses />
                  </AdminRoute>
                  <AdminRoute path="/admin/users">
                    <AdminUsers />
                  </AdminRoute>
                </Switch>
                </AdminRoute>
              </AdminLayout>
            </Route>
            <Route path="/">
              <AppLayout>
                <Switch>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                    <Route exact path="/courses">
                      <Courses />
                    </Route>
                    <Route exact path="/courses/:category">
                      <CoursesByCategory />
                    </Route>
                    <Route exact path="/course/:courseId">
                      <Course />
                    </Route>
                  <Redirect exact from="/course" to="/courses/" />
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/signup">
                    <Register />
                  </Route>
                

                  <Route path="/user">
                    <UserProfile>
                      {/* <UserRoute> */}
                      <Switch>
                        <Redirect
                          exact
                          from="/user"
                          to="/user/public-profile"
                        />
                        <Route path="/user/public-profile">
                          <PublicProfile />
                        </Route>
                        <Route path="/user/edit-profile">
                          <EditProfile />
                        </Route>
                        <Route path="/user/course-enroll">
                          <CourseEnroll />
                        </Route>
                      </Switch>
                      {/* </UserRoute> */}
                    </UserProfile>
                  </Route>
                  <Switch>
                    <Route path="/404-not-found" component={PageNotFound} />
                    <Redirect from="*" to="/404-not-found" />
                  </Switch>
                </Switch>
              </AppLayout>
            </Route>
          </Switch>
        </BrowserRouter>
      </Suspense>
    </>
  );
}

export default App;
