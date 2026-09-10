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
import Language from './pages/Language';
import LanguageDetail from './pages/LanguageDetail';
import CreatedFieldStudy from './pages/CreateFieldStudy';
import UpdateFieldStudy from './pages/UpdateFieldStudy';
import CreateSkill from './pages/CreateSkill';
import UpdateSkill from './pages/UpdateSkill';
import CreateLanguage from './pages/CreateLanguage';
import UpdateLanguage from './pages/UpdateLanguage';
import Video from './pages/Video';

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

                            <Route
                                path="/field-study/:fieldId"
                                element={<FieldStudyDetail />}
                            />

                            <Route
                                path="/created-fieldStudy"
                                element={<CreatedFieldStudy />}
                            />

                            <Route
                                path="/update-fieldStudy/:fieldId"
                                element={<UpdateFieldStudy />}
                            />

                            <Route
                                path="/create-skill"
                                element={<CreateSkill />}
                            />

                            <Route
                                path="/update-skill/:skillId"
                                element={<UpdateSkill />}
                            />

                            <Route path="/skill" element={<Skill />} />

                            <Route
                                path="/skill/:skillId"
                                element={<SkillDetail />}
                            />

                            <Route path="/language" element={<Language />} />

                            <Route
                                path="/language/:languageId"
                                element={<LanguageDetail />}
                            />

                            <Route path='/create-language' element={<CreateLanguage/>}/>
                            <Route path='/update-language/:languageId' element={<UpdateLanguage/>}/>

                            <Route path="/video" element={<Video />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    );
}

export default App;
