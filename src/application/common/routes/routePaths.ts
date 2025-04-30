const MainPaths = {
    LOGIN_PATH: '/login',
    PASSWORD_RECOVERY_PATH: '/password-recovery',
    PASSWORD_RESET_PATH: '/password-reset/:token',
}

const DashboardPaths = {
    HOME: '/dashboard/home',
}

export const RoutePaths = {
    ...MainPaths,
    ...DashboardPaths,
}
