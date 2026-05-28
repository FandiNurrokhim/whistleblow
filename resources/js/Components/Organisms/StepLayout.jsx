import { motion } from "framer-motion";

export default function StepLayout({ title, subtitle, children }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-10 max-w-3xl w-full"
        >
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
                {title}
            </h2>
            {subtitle && (
                <p className="text-slate-500 mb-6">{subtitle}</p>
            )}
            <div className="text-slate-700 space-y-4">
                {children}
            </div>
        </motion.div>
    );
}