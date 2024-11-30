import { Route, Routes } from "react-router-dom";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Lost from "./components/lostpage/Lost";
import LostItems from "./components/lostItems/LostItems";
import FoundItems from "./components/foundItems/FoundItems";
import FoundPage from "./components/foundpage/FoundPage";
import Front from "./components/frontpage/Front";
import ItemPage from "./components/ItemPage/ItemPage";
import UserComponent from "./components/UserComponent/UserComponent";

import { createClient } from "@supabase/supabase-js";
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_AR;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY_AR;
const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  return (
    <Routes>
      <Route path="/SignIn" element={<SignIn supabase={supabase} />} />
      <Route path="/SignUp" element={<SignUp supabase={supabase} />} />
      <Route path="/Lost" element={<Lost supabase={supabase} />} />
      <Route path="/LostItems" element={<LostItems supabase={supabase} />} />
      <Route path="/FoundItems" element={<FoundItems supabase={supabase} />} />
      <Route path="/Found" element={<FoundPage supabase={supabase} />} />
      <Route path="/User" element={<UserComponent supabase={supabase} />} />
      <Route
        path="/ItemPage/:type/:id"
        element={<ItemPage supabase={supabase} />}
      />
      <Route exact path="/" element={<Front supabase={supabase} />} />
    </Routes>
  );
}

export default App;
