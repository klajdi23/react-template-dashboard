import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const InputTooltip: React.FC<{
    isVisible: boolean,
    title: string,
    list: string[]
}> = ({ isVisible, title, list = [] }) => {
    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="absolute left-full ml-2 -top-16  -translate-y-64 w-64 bg-white shadow-xl rounded-lg border border-gray-200"
                    style={{ originY: -0.5}}
                >
                    <div className="relative">
                        <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-b-8 border-r-8 border-t-transparent border-b-transparent border-r-white"></div>
                        <div className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-6 border-b-6 border-r-6 border-t-transparent border-b-transparent border-r-white"></div>

                        <div className="border-b border-gray-200 bg-white px-4 py-2 font-medium text-gray-700 rounded-t-lg">
                            {title}
                        </div>
                        <ul className="text-sm text-gray-600 space-y-1 p-4">
                            {list.map((listItem: string) =>
                                (<li className="flex items-center">
                                    <span className="bg-amber-500 text-white rounded-full h-4 w-4 text-xs flex items-center justify-center mr-2">!</span>
                                    {listItem}
                                </li>))
                            }
                        </ul>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default InputTooltip;
