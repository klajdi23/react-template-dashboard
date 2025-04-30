import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import LoginPage from "../application/pages/auth/login/component/LoginPageComponent";
import PasswordRecoveryPage from "../application/pages/auth/passwordRecovery/component/PasswordRecoveryPageComponent";
import PasswordResetPage from "../application/pages/auth/passwordReset/component/PasswordResetPageComponent";
import DashboardLayoutTemplate from "../application/pages/dashboard/layout/DashboardLayoutTemplate";
import {RoutePaths} from "../application/common/routes/routePaths";

const MainRouter: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Login section */}
                <Route path={RoutePaths.LOGIN_PATH} element={<LoginPage />} />
                <Route path={RoutePaths.PASSWORD_RECOVERY_PATH} element={<PasswordRecoveryPage />} />
                <Route path={RoutePaths.PASSWORD_RESET_PATH} element={<PasswordResetPage />} />

                {/* Dashboard with layout wrapper */}
                <Route path={RoutePaths.HOME} element={<DashboardLayoutTemplate />}>
                    <Route index element={<h1> In development </h1>} /> {/* /dashboard */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
}


export default MainRouter;
