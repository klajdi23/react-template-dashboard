import React from 'react';
import {Dialog, DialogBackdrop, DialogPanel, TransitionChild} from '@headlessui/react'
import {
    Bars3Icon, BellAlertIcon,
    ChartPieIcon,
    HomeIcon, ShieldCheckIcon, ShoppingCartIcon,
    UsersIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import {Outlet} from "react-router-dom";
import {IconUtils} from "../../../common/consts/icons";

const navigation = [
    { name: 'Home', href: '#', icon: HomeIcon, current: true },
    { name: 'Reports', href: '#', icon: ChartPieIcon, current: false },
    { name: 'Users', href: '#', icon: UsersIcon, current: false },
    { name: 'Marketing', href: '#', icon: ShoppingCartIcon, current: false },
    { name: 'Notifications', href: '#', icon: BellAlertIcon, current: false },
    { name: 'Settings', href: '#', icon: ShieldCheckIcon, current: false },
];

function classNames(...classes : string[]) {
    return classes.filter(Boolean).join(' ')
}

const DashboardLayoutTemplate : React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false)
    return (<>

        <div>
            <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="relative z-50 lg:hidden">
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                <button type="button" onClick={() => setSidebarOpen(false)} className="-m-2.5 p-2.5">
                                    <span className="sr-only">Close sidebar</span>
                                    <XMarkIcon aria-hidden="true" className="size-6 text-white" />
                                </button>
                            </div>
                        </TransitionChild>
                        {/* Sidebar component, swap this element with another sidebar if you like */}
                        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary600 px-6 pb-2">
                            <div className="flex h-16 shrink-0 items-center">
                                <img
                                    alt=""
                                    src={IconUtils.whiteLogo}
                                    className="h-8 w-auto"
                                />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul className="flex flex-1 flex-col gap-y-7">
                                    <li>
                                        <ul className="-mx-2 space-y-1">
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        className={classNames(
                                                            item.current
                                                                ? 'bg-primary700 text-white'
                                                                : 'text-primary200 hover:bg-primary700 hover:text-white',
                                                            'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className={classNames(
                                                                item.current ? 'text-white' : 'text-primary200 group-hover:text-white',
                                                                'size-6 shrink-0',
                                                            )}
                                                        />
                                                        {item.name}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-primary600 px-6">
                    <div className="flex h-16 shrink-0 items-center">
                        <img
                            alt=""
                            src={IconUtils.whiteLogo}
                            className="h-8 w-auto"
                        />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul  className="flex flex-1 flex-col gap-y-7">
                            <li>
                                <ul className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <a
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-primary700 text-white'
                                                        : 'text-primary200 hover:bg-primary700 hover:text-white',
                                                    'group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold',
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        item.current ? 'text-white' : 'text-primary200 group-hover:text-white',
                                                        'size-6 shrink-0',
                                                    )}
                                                />
                                                {item.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="-mx-6 mt-auto">
                                <a
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-primary700"
                                >
                                    <img
                                        alt=""
                                        src="https://media.licdn.com/dms/image/v2/C4E03AQEWUjISbRSttA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1605456220623?e=1748476800&v=beta&t=7KRqaCo_KaFaNIMR2hctfYbR2n_MuDH7uWbQqo5bskI"
                                        className="size-8 rounded-full bg-primary700"
                                    />
                                    <span className="sr-only">Your profile</span>
                                    <span aria-hidden="true">{"Test User"}</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-primary600 px-4 py-4 shadow-xs sm:px-6 lg:hidden">
                <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-primary200 lg:hidden">
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon aria-hidden="true" className="size-6" />
                </button>
                <div className="flex-1 text-sm/6 font-semibold text-white">Dashboard</div>
                <a href="#">
                    <span className="sr-only">Your profile</span>
                    <img
                        alt=""
                        src="https://media.licdn.com/dms/image/v2/C4E03AQEWUjISbRSttA/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1605456220623?e=1748476800&v=beta&t=7KRqaCo_KaFaNIMR2hctfYbR2n_MuDH7uWbQqo5bskI"
                        className="size-8 rounded-full bg-primary700"
                    />
                </a>
            </div>

            <main className="py-10 lg:pl-72">
                <div className="px-4 sm:px-6 lg:px-8">
                    <Outlet/>
                </div>
            </main>
        </div>
    </>);
}
export default DashboardLayoutTemplate;
