import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import {useDispatch} from "react-redux";

import { Header } from "./components";
import { Footer } from "./components/Footer";
import { Home, FullPost, Registration, AddPost, Login, TagPosts } from "./pages";
import {useEffect} from "react";
import {fetchAuthMe} from "./redux/slices/auth";

function App() {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [dispatch]);

  return (
    <div className="appShell">
      <Header />
      <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, pb: { xs: 3, sm: 4, md: 6 } }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tags/:tag" element={<TagPosts />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
