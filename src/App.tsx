import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardLayout from './components/layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ProtectRoute from './components/layouts/ProtectRoute';
import FieldStudy from './pages/FieldStudy';
import Skill from './pages/Skill';
import SkillDetail from './pages/SkillDetail';
import FieldStudyDetail from './pages/FieldStudyDetail';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    {/* dong 21 : cong viec la xac thuc nguoi dung da login hay chua */}

                    <Route element={<ProtectRoute />}>
                        {/* Dashboardlayout layout cho tất cả các tuyến con */}
                        <Route element={<DashboardLayout />}>
                            <Route path="/" element={<Dashboard />} />
                            <Route
                                path="/field-study"
                                element={<FieldStudy />}
                            />
                            <Route path="/skill" element={<Skill/>} />
                            <Route path="/skill/:skillId" element={<SkillDetail />} />
                            <Route path="/field-study/:fieldId" element={<FieldStudyDetail />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
