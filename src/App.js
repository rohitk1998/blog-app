import React from "react"
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
  Redirect
} from "react-router-dom";
import Login from "./Authenctication/Login";
import AdminHome from "./Views/Admin/AdminHome";
import PrivateRoutes from "./Routes/PrivateRoutes";
import UserHome from "./Views/User/UserHome";
import UserProfile from "./Views/User/UserProfile";
import UserSetting from "./Views/User/UserSetting";
import AdminCreateBlog from "./Views/Admin/AdminCreateBlog";
import UserCreateBlog from "./Views/User/UserCreateBlog";
import UserBlogs from "./Views/User/UserBlogs";
import UsersList from "./Views/Admin/UsersList";
import UserProfileView from "./Views/Admin/UserProfileView";
import UserBlogView from "./Views/User/UserBlogView";

function App() {
  return (
    <div className="App">
     <Switch>
     <Route
            exact
            path="/"
            render={() => (
              <Redirect to="/Login" />
            )}
          />
            <Route exact path='/Login' component={Login}/>
            {/* Admin Route */}
            <PrivateRoutes exact path='/AdminHome' component={AdminHome}/>
            <PrivateRoutes exact path='/All_Users' component={UsersList} />
            <PrivateRoutes exact path='/createBlog' component={AdminCreateBlog} />
            <PrivateRoutes eaxt path='/UserProfileView' component={UserProfileView}/>
            {/* User Route */}
            <PrivateRoutes exact path='/Home' component={UserHome}/>
            <PrivateRoutes exact path='/profile' component={UserProfile} />
            <PrivateRoutes exact path='/setting' component={UserSetting} />
            <PrivateRoutes exact path='/writeBlog' component={UserCreateBlog} />
            <PrivateRoutes exact path='/Blogs' component={UserBlogs} />
            <PrivateRoutes exact path='/Blog' component={UserBlogView}  />
     </Switch>
    </div>
  );
}

export default App;
